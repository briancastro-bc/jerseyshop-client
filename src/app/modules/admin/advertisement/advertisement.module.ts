import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';


@NgModule({
  declarations: [
    AdvertisementComponent
  ],
  imports: [
    CommonModule,
    AdvertisementRoutingModule
  ]
})
export class AdvertisementModule { }
