import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, filter, Observable, Subject, tap } from 'rxjs';

import { Auth } from './interfaces/auth.interface';
import { ResponseAuth } from './interfaces/response.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	Token$: Subject<string> = new Subject<string>();

	constructor(private http: HttpClient, private _messageService: MessageService) {}

	login(user: Auth): Observable<ResponseAuth|Auth> {
		return this.http.post<ResponseAuth|Auth>('auth/login', user).pipe(
			filter<ResponseAuth|Auth>(res => res && !!res),
			tap((res: ResponseAuth|Auth) => {
				console.log(res);
			}),
			catchError((err: HttpErrorResponse) => {
				this._messageService.add({severity: 'error', summary: err.message, detail: 'Error was ocurred'});
				throw err;
			})
		);
	}

	setJwt(res: any): void {
		this.Token$.next(res.token);
	}
}
