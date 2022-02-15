import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { AuthService } from '../../services';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	signupForm!: FormGroup;
	stepsItems!: MenuItem[];
	active!: number;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.signupForm = this.formBuilder.group({
			email: [
				null,
				[Validators.required, Validators.email, Validators.maxLength(70)],
			],
			password: [null, [Validators.required, Validators.minLength(8)]],
			confirm_password: [null, [Validators.required, Validators.minLength(8)]],
			name: [null, [Validators.required]],
			last_name: [null, [Validators.required]],
			birthday: [null, [Validators.required]],
			accept_advertising: [null, []],
			accept_terms: [null, [Validators.required]],
		});
	}

	validate(): void {
		return this.password?.value === this.confirm_password?.value
			? this.onSubmit()
			: this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: 'Verifica que las contraseñas sean iguales',
			  });
	}

	onSubmit(): void {
		this.authService
			.signup(this.signupForm.value)
			.subscribe((_) => this.router.navigate(['']));
	}

	get email() {
		return this.signupForm.get('email');
	}

	get password() {
		return this.signupForm.get('password');
	}

	get confirm_password() {
		return this.signupForm.get('confirm_password');
	}

	get name() {
		return this.signupForm.get('name');
	}

	get last_name() {
		return this.signupForm.get('last_name');
	}

	get birthday() {
		return this.signupForm.get('birthday');
	}

	get accept_advertising() {
		return this.signupForm.get('accept_advertising');
	}

	get accept_terms() {
		return this.signupForm.get('accept_terms');
	}
}
