import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductComponent 
  },
  {
    path: 'create',
    component: ProductCreateComponent
  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductRoutingModule {}
