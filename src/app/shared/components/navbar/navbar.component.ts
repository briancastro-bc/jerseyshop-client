import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@modules/public/auth/services';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

	userSetup: any = {
		status: 'Acceder',
		display: false,
	};
	sidebarContent!: MenuItem[];
	user$!: Subscription;
	isLoggedIn!: Observable<boolean>;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.setUp();
	}

	ngOnDestroy(): void {
		this.user$.unsubscribe();
	}

	displaySidebar(): void {
		this.userSetup.display = true;
	}

	logout(): void {
		this.authService.logOut();
	}

	private setUp(): void {
		this.user$ = this.authService.getUser().subscribe((user) => {
			this.userSetup.status = user ? user.name : 'Perfil';
		});
	}
}
