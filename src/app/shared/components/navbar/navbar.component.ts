import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@modules/public/auth/services';
import { Observable, Subscription } from 'rxjs';
import { User } from '@app/shared/interfaces';

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
		this.isLoggedIn = this.authService.isLoggedIn()
		this.setUp();
		this.sidebarContent = [
			{
				label: 'Categorias',
				items: [
					{
						label: 'New',
						icon: 'pi pi-fw pi-plus',
						items: [
							{ label: 'User', icon: 'pi pi-fw pi-user-plus' },
							{ label: 'Filter', icon: 'pi pi-fw pi-filter' },
						],
					},
					{ label: 'Open', icon: 'pi pi-fw pi-external-link' },
					{ separator: true },
					{ label: 'Quit', icon: 'pi pi-fw pi-times' },
				],
			},
		];
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
		this.user$ = this.authService.getUser().subscribe(user => {
			console.log(user);
			this.userSetup.status = user.name;
		});
	}
}
