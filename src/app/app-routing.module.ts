import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadChildren: () =>
			import('./modules/public/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/public/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: '404',
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
