import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
	{ 
		path: '', 
		component: AdminComponent,
		children: [

		]
	},
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
	{
		path: 'inventory',
		loadChildren: () =>
			import('./inventory/inventory.module').then((m) => m.InventoryModule),
	},
	{
		path: 'advertisement',
		loadChildren: () =>
			import('./advertisement/advertisement.module').then((m) => m.AdvertisementModule),
	},
	{
		path: 'rooms',
		loadChildren: () => import('./rooms/rooms.module').then((m) => m.RoomsModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
