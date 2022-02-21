import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import { SocketService } from '@shared/services/local';
import { RoomsService } from '@modules/admin/rooms/services';
import { Room } from '@modules/admin/rooms/interfaces';

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
		private socketService: SocketService,
		private roomsService: RoomsService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
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
				this.roomsService.rooms().subscribe((res) => {
					let random = Math.floor(Math.random() * (res.data.rooms.length - 0)) + 0;
					const room: Room = res.data.rooms[random];
					this.socketService.joinRoom({
						room: room.code,
					});
					this.socketService.onUserJoined().subscribe((res) => {
						this.router.navigate(['support'], {
							queryParams: {
								room: this.socketService.room,
							},
						});
						this.messageService.add({
							severity: 'success',
							summary: 'Completado',
							detail: 'Pronto te atenderá un encargado',
						});
					});
				});
				this.subscriptions$.push(
					this.socketService.onRoomLimit().subscribe((_) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: 'El limite de la sala fue superado',
						});
					})
				);
				this.subscriptions$.push(
					this.socketService.onRoomNotFound().subscribe((_) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: 'La sala está inactiva',
						});
					})
				);
			},
			reject: () => {
				console.log('Rejected');
			},
			key: 'join-room',
		});
	}
}
