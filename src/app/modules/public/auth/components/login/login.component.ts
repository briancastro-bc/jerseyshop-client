import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@common/services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required]],
		});
	}

	onSubmit(): void {
		this.authService
			.logIn(this.loginForm.value)
			.subscribe((_) => this.router.navigate(['']));
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}
}
