import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from '@shared/services/local';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private tokenService: TokenService) {}

	intercept<T>(
		request: HttpRequest<T>,
		next: HttpHandler
	): Observable<HttpEvent<T>> {
		return next.handle(request).pipe(
			tap(() => {
				const token = localStorage.getItem('access_token') // || this.tokenService.token;
				this.tokenService.refreshToken(token);
			})
		);
	}
}
