import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ISocket } from '@shared/interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  currentRoom?: string;

  constructor(private socket: Socket) { }

  // Server events.
  createRoom(data: ISocket): Observable<any> {
    this.socket.connect();
    return this.socket.fromEvent('connect').pipe((res) => {
      this.currentRoom = data.room;
      this.socket.emit('create_room', data);
      return res;
    })
  }

  joinRoom(data: ISocket) {
    this.socket.emit('join', data);
  }

  sendMessage(data: ISocket) {
    this.socket.ioSocket.send(data);
  }

  // Client events.
  onMessage(): Observable<ISocket|any> {
    return this.socket.fromEvent('message').pipe<ISocket|any>((res) => {
      return res;
    });
  }

  onRoomLimit(): Observable<ISocket> {
    return this.socket.fromEvent('room_limit');
  }

  onRoomNotFound(): Observable<ISocket> {
    return this.socket.fromEvent('room_not_found');
  }

  onUserJoined(): Observable<ISocket> {
    return this.socket.fromEvent('user_joined');
  }

}
