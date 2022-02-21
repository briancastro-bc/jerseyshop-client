import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

import { ISocket } from '@shared/interfaces';

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	room?: string;

	constructor(
		private router: Router,
		private socket: Socket, 
		private messageService: MessageService
	) {}

	/**
	 *
	 * @param data
	 * Emit create_room event to server.
	 *
	 */
	createRoom(data: ISocket) {
		this.socket.emit('create_room', {
			room: data.room,
		});
		this.onCreateRoom({
			room: data.room,
		});
	}

	/**
	 *
	 * @param data
	 * Receive the create_room event response.
	 *
	 */
	onCreateRoom(data: ISocket): Observable<ISocket> {
		//this.socket.connect(); //If autoconnect is disabled, this line connect the sockets.
		return this.socket.fromEvent<ISocket>('create_room').pipe((res) => {
			this.room = data.room;
			this.messageService.add({
				severity: 'info',
				summary: 'Aviso',
				detail: 'Creando sala de soporte',
			});
			return res;
		});
	}

	/**
	 *
	 * @param data
	 * Emit join server event.
	 *
	 */
	joinRoom(data: ISocket) {
		this.socket.emit('join', {
			room: data.room,
		});
		this.onJoinRoom({
			room: data.room,
		});
	}

	/**
	 *
	 * @param data
	 * Receive join event response.
	 *
	 */
	onJoinRoom(data: ISocket) {
		return this.socket.fromEvent('join').pipe((res) => {
			this.room = data.room;
			this.messageService.add({
				severity: 'info',
				summary: 'Aviso',
				detail: `Intentando unirse a la sala de soporte #${this.room}`,
			});
			return res;
		});
	}

	/**
	 *
	 * @param data
	 * Server event
	 *
	 */
	onSendMessage(data: ISocket) {
		this.socket.ioSocket.send(data);
	}

	leaveRoom(data: ISocket) {
		this.socket.emit('leave', {
			room: data.room
		});
	}

	onUserLeft() {
		return this.socket.fromEvent('user_left').pipe(res => {
			this.messageService.add({
				severity: 'info',
				summary: 'Information',
				detail: 'Abandonándo la sala...'
			});
			this.router.navigate(['']);
			return res
		});
	}

	// Client events.
	onMessage(): Observable<ISocket> {
		return this.socket.fromEvent<ISocket>('message');
	}

	onUserJoined(): Observable<ISocket> {
		return this.socket.fromEvent<ISocket>('user_joined').pipe((res) => {
			return res;
		});
	}

	onRoomExist(): Observable<ISocket> {
		return this.socket.fromEvent('room_exist');
	}

	onRoomLimit(): Observable<ISocket> {
		return this.socket.fromEvent('room_limit');
	}

	onRoomNotFound(): Observable<ISocket> {
		return this.socket.fromEvent('room_not_found');
	}
}
