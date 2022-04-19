import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
	{ 
		path: '', 
		component: InventoryComponent,
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full'
			},
			{
				path: 'overview',
				data: {
					title: 'Resumen'
				},
			},
			{
				path: 'products',
				data: {
					title: 'Productos'
				},
				loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
			},
			{
				path: 'categories',
				data: {
					title: 'Categorias'
				},
			},
			{
				path: 'sizes',
				data: {
					title: 'Tallas'
				},
			},
			{
				path: 'colors',
				data: {
					title: 'Colores'
				},
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InventoryRoutingModule {}
