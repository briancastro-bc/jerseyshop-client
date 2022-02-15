import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: RoomsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        data: {
          title: 'Lista de salas'
        },
        component: RoomListComponent
      },
      {
        path: 'create',
        data: {
          title: 'Crear sala'
        },
        component: RoomCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
