import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotLoggedGuard, LoggedGuard } from '@app/common/guards';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		data: {
			title: 'Jersey Shop',
		},
		loadChildren: () =>
			import('./modules/public/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'support',
		data: {
			title: 'Soporte',
		},
		loadChildren: () =>
			import('./modules/public/support/support.module').then(
				(m) => m.SupportModule
			),
	},
	{
		path: 'auth',
		canActivate: [LoggedGuard],
		loadChildren: () =>
			import('./modules/public/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'admin',
		canActivate: [NotLoggedGuard],
		data: {
			title: 'Panel',
		},
		loadChildren: () =>
			import('./modules/admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: '404',
		data: {
			title: 'No encontrado',
		},
		loadChildren: () =>
			import('./modules/public/not-found/not-found.module').then(
				(m) => m.NotFoundModule
			),
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
