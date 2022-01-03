import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		data: {
			title: 'Inicio'
		},
		loadChildren: () =>
			import('./modules/public/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'auth',
		canActivate: [LoggedGuard],
		loadChildren: () =>
			import('./modules/public/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: '404',
		data: {
			title: 'No encontrado'
		},
		loadChildren: () =>
			import('./modules/public/not-found/not-found.module').then((m) => m.NotFoundModule),
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
