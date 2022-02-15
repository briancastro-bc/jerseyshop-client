import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

@NgModule({
	declarations: [
    RoomsComponent, 
    RoomCreateComponent, 
    RoomListComponent, RoomCardComponent
  ],
	imports: [
		CommonModule,
		RoomsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
    SharedModule
	],
})
export class RoomsModule {}
