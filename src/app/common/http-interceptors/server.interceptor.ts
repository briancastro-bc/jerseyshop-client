import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse
} from '@angular/common/http';
import { SpinnerService, LocalStorageService } from '@shared/services/local';
import { environment } from 'src/environments/environment';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
	private readonly server_url: string = environment.server_endpoint;

	constructor(
		private spinnerService: SpinnerService,
		private localStorage: LocalStorageService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.spinnerService.showSpinner();
		const token = this.localStorage.getItem('access_token');
		const request: HttpRequest<any> = req.clone({
			url: `${this.server_url}/${req.url}`,
			withCredentials: true,
			setHeaders: {
				Authorization:  `Bearer ${token != null ? token : null}`,
			},
		});
		return next.handle(request).pipe(
			finalize(() => this.spinnerService.hideSpinner())
		);
	}
}
