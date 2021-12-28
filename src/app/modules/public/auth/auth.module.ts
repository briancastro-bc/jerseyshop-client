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
import { ToastModule } from 'primeng/toast';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
	declarations: [
		AuthComponent, 
		LoginComponent, 
		SignupComponent
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
		ToastModule
	],
	exports: [],
})
export class AuthModule {}
