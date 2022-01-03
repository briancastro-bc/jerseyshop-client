import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG components.
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { StepsModule } from 'primeng/steps';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';

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
		CardModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		KeyFilterModule,
		MessageModule,
		MessagesModule,
		StepsModule,
	],
	exports: [],
})
export class AuthModule {}
