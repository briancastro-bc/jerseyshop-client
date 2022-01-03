import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { SpinnerService, TokenService } from '@shared/services/local';
import { environment } from 'src/environments/environment';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
	private readonly server_url: string = environment.server_endpoint;

	constructor(
		private spinnerService: SpinnerService,
		private tokenService: TokenService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.spinnerService.showSpinner();
		const request: HttpRequest<any> = req.clone({
			url: `${this.server_url}/${req.url}`,
			withCredentials: true,
			setHeaders: {
				Authorization: `Bearer ${this.tokenService.token}`,
			},
		});
		return next.handle(request).pipe(
			finalize(() => this.spinnerService.hideSpinner())
		);
	}
}
