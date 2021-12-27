import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	Token$: Subject<string> = new Subject<string>();

	constructor(private http: HttpClient) {}

	setJwt(res: any): void {
		this.Token$.next(res.token);
	}
}
