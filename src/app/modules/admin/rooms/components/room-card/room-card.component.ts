import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { SocketService } from '@app/shared/services/local';
import { MessageService } from '@common/services'
import { Room } from '@common/interfaces';

@Component({
	selector: 'app-room-card',
	templateUrl: './room-card.component.html',
	styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit, OnDestroy {

	@Input() data: Room[];
	subscriptions$: Subscription[] = [];

	constructor(
		private router: Router,
		private message: MessageService,
		private socketService: SocketService,
		private confirmService: ConfirmationService,
	) {}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.subscriptions$.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

	create(room: string | undefined): void {
		this.confirmService.confirm({
			header: 'Sala de soporte',
			message: '¿Estás seguro de que quieres crear una sala de soporte?',
			acceptLabel: 'Si',
			rejectLabel: 'No',
			accept: () => {
				this.socketService.createRoom({
					room: room,
				});
				this.onJoinInRoom(room);
				this.subscriptions$.push(
					this.socketService.onRoomExist().subscribe((res) => {
						this.message.error('La sala ya esta activa');
					})
				);
			},
			key: 'create-room',
		});
	}

	join(room: string | undefined) {
		this.socketService.joinRoom({
			room: room,
		});
		this.onJoinInRoom(room);
	}

	private onJoinInRoom(room: string | undefined) {
		if (room === 'undefined') return;
		this.socketService.onUserJoined().subscribe((res) => {
			this.router.navigate(['support'], {
				queryParams: {
					room: room,
				},
			});
			this.message.info(`Te hemos unido a la sala de soporte #${room}`);
		});
	}
}
