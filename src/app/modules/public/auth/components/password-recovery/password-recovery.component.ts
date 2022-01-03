import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
	selector: 'app-password-recovery',
	templateUrl: './password-recovery.component.html',
	styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
	recoveryForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.recoveryForm = this.formBuilder.group({
			email: [null, [Validators.required, Validators.email]],
		});
	}

	onSubmit(): void {
		this.authService.passwordRecovery(this.recoveryForm.value).subscribe((_) => {
			this.recoveryForm.reset();
			this.router.navigate(['/auth']);
		});
	}

	get email() {
		return this.recoveryForm.get('email');
	}
}
