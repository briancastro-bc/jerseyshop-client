import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '@modules/public/auth/services';
import { NotificationService } from '@app/common/services';
import { NotificationComponent } from '@shared/components/notification/notification.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

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
		this.setUp();
	}

	ngAfterViewInit(): void {
		//this.notificationComponent.reload();
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

	private setUp(): void {
		this.user$ = this.authService.getUser().subscribe((user) => {
			this.userSetup.status = user ? user.name : 'Perfil';
		});
	}
}
