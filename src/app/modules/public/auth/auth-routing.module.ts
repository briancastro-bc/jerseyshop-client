import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent, SignupComponent } from './components';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
