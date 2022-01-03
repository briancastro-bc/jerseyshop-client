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

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		this.tokenService
			.refreshToken(this.tokenService.token)
		return next.handle(request);
	}
}
