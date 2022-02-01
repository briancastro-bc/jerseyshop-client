import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptor } from './server.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const httpInterceptorsProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
