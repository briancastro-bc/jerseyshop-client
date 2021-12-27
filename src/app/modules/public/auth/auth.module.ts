import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG components.
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
	declarations: [AuthComponent, LoginComponent, SignupComponent],
	imports: [
		CommonModule, 
		AuthRoutingModule,
		FormsModule,
		CardModule,
		InputTextModule
	],
	exports: []
})
export class AuthModule {}
