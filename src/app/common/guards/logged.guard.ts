import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@common/services';

@Injectable({
	providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.userHasToken()) return true;
		this.router.navigate(['']);
		return false;
	}
}
