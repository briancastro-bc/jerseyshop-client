import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

import { RouteService } from '@shared/services/local/route.service';
import { SocketService } from '@shared/services/local';
import { RoomsService } from '@modules/admin/rooms/services';
import { Room } from '@modules/admin/rooms/interfaces/room.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	supportItems!: MenuItem[];
	subscriptions$: Subscription[] = [];

	constructor(
		private routeService: RouteService, 
		private primeNgConfig: PrimeNGConfig,
		private roomsService: RoomsService,
		private socket: Socket,
		private socketService: SocketService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.routeService.initRouteConfig();
		this.primeNgConfig.ripple = true;
		this.supportItems = [
			{
				icon: 'pi pi-users',
				command: () => {
					this.confirmJoinInSupportRoom();
				}
			}
		];
	}

	confirmJoinInSupportRoom(): void {
		this.confirmationService.confirm({
			header: 'Salas de soporte',
			message: '¿Estas seguro de que quieres unirte a una sala de soporte y recibir ayuda?',
			acceptLabel: 'Si',
			rejectLabel: 'No',
			accept: () => {
				this.roomsService.rooms().subscribe(
					(res) => {
						let random = Math.floor(Math.random() * (res.body.data.rooms.length - 0)) + 0;
						const room: Room = res.body.data.rooms[random];
						this.socketService.onCreateRoom({
							room: room.code,
						}).subscribe(
							(res) => {
								//TODO: verificar porque no se subscribe luego de hacer la solicitud.
								console.log(res);
								this.router.navigate(['support'], {
									queryParams: { code: this.socketService.room }
								});
							}
						);
					}
				);
				this.subscriptions$.push(
					this.socketService.onRoomLimit().subscribe(
						res => {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: 'El limite de la sala fue superado'
							});
						}
					)
				);
				this.subscriptions$.push(
					this.socketService.onRoomNotFound().subscribe(
						res => {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: 'La sala no existe o el código es inválido'
							});
						}
					)
				)
			},
			reject: () => {
				console.log('Rejected');
			},
			key: 'support-room'
		});
	}
}
