import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, Subject, tap } from 'rxjs';

import { Auth } from '@modules/public/auth/interfaces/auth.interface';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //Token$: Subject<string> = new Subject<string>();
  //token!: string;

  constructor(private http: HttpClient, private _messageService: MessageService) { }

  refreshToken(access_token: string|null): Observable<Auth> {
    return this.http.post<Auth>('auth/refresh/token', access_token).pipe(
      filter<Auth>((resp) => resp && !!resp),
      tap((resp: Auth) => {
        console.log(`Refrescando el token...`);
        console.log(resp);
        this.saveToken(resp);
      }),
      catchError((err: HttpErrorResponse) => {
        this.removeToken(); //Si hay un error, quiere decir que el token expiro.
        this._messageService.add({
          severity: 'error', summary: 'Oh-no!', detail: 'Vuelve a iniciar sesión'
        });
        throw err;
      })
    );
  }

  saveToken(resp: Auth): void {
    //this.token = resp.data.access_token || resp.data.refresh_token;
    localStorage.setItem('access_token', resp.data.access_token || resp.data.refresh_token);
  }

  removeToken(): void {
    //this.token = "";
    localStorage.removeItem('access_token');
  }

  userHasToken(): boolean {
    return !!localStorage.getItem('access_token'); //&& this.token != "";
  }
}
