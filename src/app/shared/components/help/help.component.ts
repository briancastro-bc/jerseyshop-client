import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { MessageService, RoomsService, SupportRoomService } from '@common/services';
import { Room } from '@common/interfaces';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit, OnDestroy {

	supportItems: MenuItem[];
	subscriptions$: Subscription[] = [];

	constructor(
		private router: Router,
		private supportRoomService: SupportRoomService,
		private roomsService: RoomsService,
		private confirmationService: ConfirmationService,
		private message: MessageService
	) {}

	ngOnInit(): void {
		this.supportItems = [
			{
				icon: 'pi pi-users',
				tooltip: 'Soporte',
				tooltipPosition: 'right',
				command: () => {
					this.confirmJoinInSupportRoom();
				},
			},
		];
	}

	ngOnDestroy(): void {
		this.subscriptions$.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

	confirmJoinInSupportRoom(): void {
		this.confirmationService.confirm({
			header: 'Salas de soporte',
			message:
				'¿Estas seguro de que quieres unirte a una sala de soporte y recibir ayuda?',
			acceptLabel: 'Si',
			rejectLabel: 'No',
			accept: () => {
				this.roomsService.getPublicRooms().subscribe((response) => {
					let random = Math.floor(Math.random() * (response.data.rooms.length - 0)) + 0;
					const room: Room = response.data.rooms[random];
					this.supportRoomService.joinRoom({
						room: room.code,
					});
					this.supportRoomService.onUserJoined().subscribe((res) => {
						this.router.navigate(['support'], {
							queryParams: {
								room: this.supportRoomService.room,
							},
						});
						this.message.success('Pronto serás atendido');
					});
				});
				this.subscriptions$.push(
					this.supportRoomService.onRoomLimit().subscribe((_) => {
						this.message.error('El limite de la sala fue superado');
					})
				);
				this.subscriptions$.push(
					this.supportRoomService.onRoomNotFound().subscribe((_) => {
						this.message.error('La sala esta inactiva');
					})
				);
			},
			reject: () => {
				// TODO: Logica on rejected
			},
			key: 'join-room',
		});
	}
}
