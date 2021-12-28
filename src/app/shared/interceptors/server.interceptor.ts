import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { SpinnerService } from '@shared/services/local';
import { AuthService } from '@modules/public/auth/auth.service';
import { environment } from 'src/environments/environment';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
	private readonly server_url: string = environment.server_endpoint;

	constructor(private spinnerService: SpinnerService, private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.spinnerService.showSpinner();
		const req: HttpRequest<any> = request.clone({
			url: `${this.server_url}/${request.url}`,
			withCredentials: true,
			setHeaders: {
				Authorization: `Bearer ${this.authService.Token$}`,
			},
		});
		return next.handle(req).pipe(finalize(() => this.spinnerService.hideSpinner()));
	}
}
