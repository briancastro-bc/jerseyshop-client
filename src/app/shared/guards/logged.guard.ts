import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@shared/services/local';

@Injectable({
	providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

	constructor(private tokenService: TokenService, private router: Router) {}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if(!this.tokenService.userHasToken()) return true;
		this.router.navigate(['']);
		return false;
	}
}
