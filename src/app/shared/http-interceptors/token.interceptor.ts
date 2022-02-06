import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, filter, take, switchMap} from 'rxjs';

import { LocalStorageService } from '@shared/services/local';
import { AuthService } from '@app/modules/public/auth/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	private refreshTokenInProgress: boolean = false;
	private tokenSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private localStorage: LocalStorageService, private authService: AuthService) {}

	intercept<T>(
		request: HttpRequest<T>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				if(err instanceof HttpErrorResponse && err.status === 401 && this.authService.userHasToken()) {
					if(!this.refreshTokenInProgress) {
						this.refreshTokenInProgress = true;
						this.tokenSubject$.next(null);
						return this.authService.refreshToken().pipe(
							switchMap(res => {
								console.log(res);
								this.refreshTokenInProgress = false;
								this.tokenSubject$.next(res.data.access_token);
								request = request.clone({
									setHeaders: {
										Authorization: `Bearer ${res.data.access_token}`
									}
								});
								return next.handle(request);
							}),
							catchError((err: HttpErrorResponse) => {
								this.refreshTokenInProgress = false;
								this.authService.logOut();
								return throwError(() => err);
							})
						)
					} else {
						return this.tokenSubject$.pipe(
							filter(access_token => access_token !== null),
							take(1),
							switchMap(token => {
								console.log(`Token value in token interceptor else: ${token}`)
								request = request.clone({
									setHeaders: {
										Authorization: `Bearer ${token}`
									}
								});
								console.log('Sending old token');
								return next.handle(request);
							})
						);
					}
				}
				return throwError(() => err);
			})
		)
	}
}