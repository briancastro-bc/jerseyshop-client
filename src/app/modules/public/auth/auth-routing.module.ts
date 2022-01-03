import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent, SignupComponent, PasswordRecoveryComponent } from './components';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full',
			},
			{
				path: 'login',
				data: {
					title: 'Acceder'
				},
				component: LoginComponent,
			},
			{
				path: 'signup',
				data: {
					title: 'Regístrate'
				},
				component: SignupComponent,
			},
			{
				path: 'recovery',
				data: {
					title: 'Recuperar contraseña'
				},
				component: PasswordRecoveryComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
