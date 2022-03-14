import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementCreateComponent } from './components/advertisement-create/advertisement-create.component';

@NgModule({
	declarations: [
		AdvertisementComponent, 
		AdvertisementCreateComponent
	],
	imports: [
		CommonModule, 
		AdvertisementRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		FormsModule,
	],
})
export class AdvertisementModule {}
