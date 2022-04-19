import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

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
	active: boolean = false;
	sidebarIsOpen: boolean = false;
	sidebarContent!: MenuItem[];
	isLoggedIn!: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	ngOnDestroy(): void {  }

	displaySidebar(): void {
		this.sidebarIsOpen = !this.sidebarIsOpen;
	}

	showNotifications(): void {
		this.active = !this.active;
		this.notificationService.toggle();
	}

	logout(): void {
		this.authService.logOut();
	}
}
