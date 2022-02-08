import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  tabMenuItems!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.tabMenuItems = [
      {
        label: 'Ver salas',
        icon: 'pi pi-eye'
      },
      {
        label: 'Crear sala',
        icon: 'pi pi-plus'
      }
    ]
  }

}
