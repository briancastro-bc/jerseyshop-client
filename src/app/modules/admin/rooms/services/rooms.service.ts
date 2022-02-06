import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, throwError, catchError, tap, map } from 'rxjs';

import { MessageService } from 'primeng/api';

import { SocketService } from '@shared/services/local/socket.service';

import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private socketService: SocketService
  ) { }


  createRoom(data: Room): Observable<Room> {
    return this.http.post<Room>('admin/rooms/create', data).pipe(
      filter(resp => resp && !!resp),
      tap(resp => {
        console.log(resp);
        this.messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: resp.data.message
        });
        this.socketService.onCreateRoom(resp.data);
      }),
      catchError((err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Oh-no!',
          detail: err.error.data.message || err.error.detail.data.message
        });
        return throwError(() => err);
      })
    );
  }

  rooms(): Observable<Room> {
    return this.http.get<Room>('admin/rooms').pipe();
  }
}
