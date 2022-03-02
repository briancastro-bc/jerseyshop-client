import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, Subject, tap, throwError } from 'rxjs';

import { MessageService } from '@app/common/services';
import { User } from '@app/common/interfaces';
import { LocalStorageService } from '@shared/services/local';

import { Auth, RefreshToken } from '../interfaces/auth.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	//private user$ = new Subject<User>();
	private isLoggedIn$ = new Subject<boolean>();
	private loggedIn!: boolean;

	constructor(
		private http: HttpClient,
		private router: Router,
		private localStorage: LocalStorageService,
		private message: MessageService,
	) {}

	logIn(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/login', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				this.localStorage.saveItem('access_token', resp.data.access_token);
				this.loggedIn = true;
				this.isLoggedIn$.next(this.loggedIn);
				//this.user$.next(resp.data.user);
				this.message.success('Parece que todo ha ido bien, bienvenido!', 'Hecho');
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error(err.error.data ? err.error.data.message : err.message, 'Oh-no');
				return throwError(() => err);
			})
		);
	}

	signup(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/signup', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				this.localStorage.saveItem('access_token', resp.data.access_token);
				this.loggedIn = true;
				this.isLoggedIn$.next(this.loggedIn);
				//this.user$.next(resp.data.user);
				this.message.success(resp.data.message, 'Completado');
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error(err.error.data ? err.error.data.message : err.message, 'Oh-no');
				return throwError(() => err);
			})
		);
	}

	googleLogin(): Observable<any> {
		return this.http.get<any>('auth/google', {
			headers: {
				ContentType: 'application/json'
			}
		}).pipe(
			filter(response => response && !!response),
			tap(
				response => {
					console.log(response);
				}
			),
			catchError((err: HttpErrorResponse) => {
				this.message.error(err.error.data ? err.error.data.message : err.message, 'Oh-no');
				return throwError(() => err);
			})
		)
	}

	verifyAccount(access_token: string): Observable<Auth> {
		//TODO: Complete account verification.
		return this.http
			.get<Auth>('auth/verify_account', {
				params: {
					token: access_token,
				},
			})
			.pipe(
				filter((resp) => resp && !!resp),
				tap((resp) => {
					console.log(resp);
				}),
				catchError((err: HttpErrorResponse) => {
					return throwError(() => err);
				})
			);
	}

	passwordRecovery(email: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/passwordRecovery', email).pipe(
			filter((resp) => resp && !!resp),
			tap((resp: Auth) => {
				this.message.success(resp.data.message, 'Hecho');
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error(err.error.data ? err.error.data.message : err.message, 'Oh-no');
				return throwError(() => err);
			})
		);
	}

	refreshToken(): Observable<RefreshToken> {
		const current_token: string | object | null =
			this.localStorage.getItem('access_token');
		return this.http
			.post<RefreshToken>('auth/refreshToken', { access_token: current_token })
			.pipe(
				tap((token) => {
					this.localStorage.updateItem('access_token', token.access_token);
				})
			);
	}

	isLoggedIn(): Observable<boolean> {
		return this.isLoggedIn$.asObservable();
	}

	/*getUser(): Observable<User> {
		return this.user$.asObservable();
	}*/

	logOut(): void {
		this.localStorage.removeItem('access_token');
		this.loggedIn = false;
		this.isLoggedIn$.next(this.loggedIn);
		this.router.navigate(['auth']);
	}

	userHasToken(): boolean {
		return !!this.localStorage.getItem('access_token');
	}
}
