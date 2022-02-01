import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, filter, Observable, tap } from 'rxjs';

import { Auth } from '../interfaces/auth.interface';
import { TokenService } from '@shared/services/local';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(private http: HttpClient, private _messageService: MessageService, private tokenService: TokenService) {}

	login(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/login', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				console.log(resp);
				this.tokenService.saveToken(resp);
			}),
			catchError((err: HttpErrorResponse) => {
				this._messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.error.data.message
				});
				throw err;
			})
		);
	}

	signup(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/signup', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				console.log(resp);
				this.tokenService.saveToken(resp);
				this._messageService.add({
					severity: 'success',
					summary: 'Completado',
					detail: resp.data.message,
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this._messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.error.data.message,
				});
				throw err;
			})
		);
	}

	verifyAccount(token: string): Observable<Auth> {
		return this.http.get<Auth>('auth/verify_account').pipe(
			//TODO: //Complete account verification.
		);
	}

	passwordRecovery(email: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/passwordRecovery', email).pipe(
			filter((resp) => resp && !!resp),
			tap((resp: Auth) => {
				console.log(resp);
				this._messageService.add({
					severity: 'success',
					summary: 'Completado',
					detail: resp.data.message,
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this._messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.error.data.message,
				});
				throw err;
			})
		);
	}

	logout(): void {
		return this.tokenService.removeToken();
	}
}
