import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	filter,
	Observable,
	throwError,
	catchError,
	tap,
	map,
	Subject,
	from,
} from 'rxjs';

import { MessageService } from '@common/services';
import { Room } from '../interfaces/room.interface';

@Injectable({
	providedIn: 'root',
})
export class RoomsService {
	private rooms$: Subject<Room[]> = new Subject<Room[]>();

	constructor(
		private http: HttpClient, 
		private message: MessageService
	) {}

	rooms(): Observable<Room> {
		return this.http.get<Room>('rooms').pipe(
			tap((res) => {
				this.rooms$.next(res.data.rooms);
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error('No hay salas de soporte disponibles');
				return throwError(() => err);
			})
		);
	}

	newRoom(data: Room): Observable<Room> {
		return this.http.post<Room>('admin/rooms/create', data).pipe(
			filter((resp) => resp && !!resp),
			tap((resp) => {
				this.message.success(resp.data.message, 'Completado');
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error(err.error.data.message || err.message, 'Oh-no!');
				return throwError(() => err);
			})
		);
	}


	getRooms(): Observable<Room[]> {
		return this.rooms$.asObservable();
	}
}
