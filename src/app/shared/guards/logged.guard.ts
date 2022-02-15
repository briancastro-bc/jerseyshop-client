import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/modules/public/auth/services';

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
