import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, filter, Observable, Subject, tap, throwError } from 'rxjs';

import { User } from '@shared/interfaces';
import { LocalStorageService } from '@shared/services/local';

import { Auth, RefreshToken } from '../interfaces/auth.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private user$ = new Subject<User>();
	private isLoggedIn$ = new Subject<boolean>();
	private loggedIn!: boolean;

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private localStorage: LocalStorageService,
		private router: Router
	) {}

	logIn(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/login', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				console.log(resp);
				this.localStorage.saveItem('access_token', resp.data.access_token);
				this.loggedIn = true;
				this.isLoggedIn$.next(this.loggedIn);
				this.user$.next(resp.data.user);
				this.messageService.add({
					severity: 'success',
					summary: 'Bienvenido',
					detail: 'Es un placer para nosotros tenerte por aquí',
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.message || err.error.data.message,
				});
				return throwError(() => err);
			})
		);
	}

	signup(user: Auth): Observable<Auth> {
		return this.http.post<Auth>('auth/signup', user).pipe(
			filter<Auth>((resp) => resp && !!resp),
			tap((resp: Auth) => {
				console.log(resp);
				this.localStorage.saveItem('access_token', resp.data.access_token);
				this.loggedIn = true;
				this.isLoggedIn$.next(this.loggedIn);
				this.user$.next(resp.data.user);
				this.messageService.add({
					severity: 'success',
					summary: 'Completado',
					detail: resp.data.message,
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.message || err.error.data.message,
				});
				return throwError(() => err);
			})
		);
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
				console.log(resp);
				this.messageService.add({
					severity: 'success',
					summary: 'Completado',
					detail: resp.data.message,
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.message || err.error.data.message,
				});
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

	getUser(): Observable<User> {
		return this.user$.asObservable();
	}

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
