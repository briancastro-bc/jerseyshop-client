import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { MessageService } from '@common/services';
import { Support } from '@common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	room?: string;

	constructor(
		private router: Router,
		private socket: Socket, 
		private message: MessageService
	) {}

	/**
	 *
	 * @param data
	 * Emit create_room event to server.
	 *
	 */
	createRoom(data: Support) {
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
	onCreateRoom(data: Support): Observable<Support> {
		//this.socket.connect(); //If autoconnect is disabled, this line connect the sockets.
		return this.socket.fromEvent<Support>('create_room').pipe((res) => {
			this.room = data.room;
			this.message.info('Creando sala de soporte...');
			return res;
		});
	}

	/**
	 *
	 * @param data
	 * Emit join server event.
	 *
	 */
	joinRoom(data: Support) {
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
	onJoinRoom(data: Support) {
		return this.socket.fromEvent('join').pipe((res) => {
			this.room = data.room;
			this.message.info(`Intentando unirse a la sala de soporte #${this.room}`);
			return res;
		});
	}

	/**
	 *
	 * @param data
	 * Server event
	 *
	 */
	onSendMessage(data: Support) {
		this.socket.ioSocket.send(data);
	}

	leaveRoom(data: Support) {
		this.socket.emit('leave', {
			room: data.room
		});
	}

	onUserLeft() {
		return this.socket.fromEvent('user_left').pipe(res => {
			this.message.info('Abandonando la sala de soporte...');
			this.router.navigate(['']);
			return res
		});
	}

	// Client events.
	onMessage(): Observable<Support> {
		return this.socket.fromEvent<Support>('message');
	}

	onUserJoined(): Observable<Support> {
		return this.socket.fromEvent<Support>('user_joined').pipe((res) => {
			return res;
		});
	}

	onRoomExist(): Observable<Support> {
		return this.socket.fromEvent('room_exist');
	}

	onRoomLimit(): Observable<Support> {
		return this.socket.fromEvent('room_limit');
	}

	onRoomNotFound(): Observable<Support> {
		return this.socket.fromEvent('room_not_found');
	}
}
