import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [AdminComponent],
	imports: [
		CommonModule, 
		AdminRoutingModule, 
		RouterModule,
		SharedModule
	],
})
export class AdminModule {}
