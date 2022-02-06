import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomCreateComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomsModule { }
