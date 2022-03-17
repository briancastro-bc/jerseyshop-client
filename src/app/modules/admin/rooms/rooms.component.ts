import { Component, OnInit } from '@angular/core';
import { MessageService, SupportRoomService } from '@app/common/services';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-rooms',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {

	tabMenuItems!: MenuItem[];
	logs: any[] = [];

	constructor(
		private supportRoomService: SupportRoomService,
		private message: MessageService
	) {}

	ngOnInit(): void {
		this.tabMenuItems = [
			{
				label: 'Ver salas',
				icon: 'pi pi-eye',
			},
			{
				label: 'Crear sala',
				icon: 'pi pi-plus',
			},
		];
		this.supportRoomService.onNotifyEntry().subscribe(
			data => {
				console.log(data);
				this.logs.push(data);
				this.message.success(data.message, data.operating_system);
			}
		)
	}
}
