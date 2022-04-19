import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
	declarations: [InventoryComponent],
	imports: [
		CommonModule, 
		InventoryRoutingModule,
		SharedModule
	],
})
export class InventoryModule {}
