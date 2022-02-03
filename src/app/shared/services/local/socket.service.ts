import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Socket } from 'ngx-socket-io';

import { ISocket } from '@shared/interfaces';
import { tap, Observable, filter, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  room?: string;

  constructor(private socket: Socket, private http: HttpClient, private _messageService: MessageService) { }

  createRoom(data: any): Observable<any> {
    return this.http.post<any>('createRoom', data).pipe(
      filter<any>(res => !!res &&res),
      tap((resp: any) => {
        console.log(resp);
        this._messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: resp.data.message
        });
        this.onCreateRoom(resp.data);
      }),
      catchError((err: HttpErrorResponse) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Oh-no!',
          detail: err.message
        });
        throw err;
      })
    )
  }

  /**
   * 
   * @param data
   * Server event
   * 
   */
  onCreateRoom(data: ISocket): Observable<any> {
    this.socket.connect();
    return this.socket.fromEvent('connect').pipe((res) => {
      console.log(res);
      this.room = data.room;
      this.socket.emit('create_room', data);
      return res;
    })
  }

  /**
   * 
   * @param data 
   * Server event
   * 
   */
  onJoinRoom(data: ISocket) {
    this.socket.emit('join', data);
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
