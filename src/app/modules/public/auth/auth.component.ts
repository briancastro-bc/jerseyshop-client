import { Component, OnInit } from '@angular/core';

import { AuthService } from '@common/services';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	constructor(
		private authService: AuthService
	) {}

	ngOnInit(): void {}

	onSignupFacebook(): void {}

	onSignupGoogle(): void {
		this.authService.googleLogin().subscribe();
	}
}
