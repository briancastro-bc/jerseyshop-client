import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		SignupComponent,
		PasswordRecoveryComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [],
})
export class AuthModule {}
