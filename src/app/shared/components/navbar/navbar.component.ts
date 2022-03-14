import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '@app/common/services';
import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

	notifications$: Observable<Advertisement[]> = this.notificationService.publicNotifications$;
	userSetup: any = {
		status: 'Acceder',
		display: false,
	};
	active: boolean = false;
	sidebarContent!: MenuItem[];
	user$!: Subscription;
	isLoggedIn!: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
		//this.setUp();
	}

	ngOnDestroy(): void {
		this.user$.unsubscribe();
	}

	displaySidebar(): void {
		this.userSetup.display = true;
	}

	showNotifications(): void {
		this.active = !this.active;
		this.notificationService.toggle();
	}

	logout(): void {
		this.authService.logOut();
	}

	/*private setUp(): void {
		this.user$ = this.authService.getUser().subscribe((user) => {
			this.userSetup.status = 'Perfil';
		});
	}*/
}
