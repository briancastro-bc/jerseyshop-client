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

import { MessageService } from 'primeng/api';

import { SocketService } from '@shared/services/local/socket.service';

import { Room } from '../interfaces/room.interface';

@Injectable({
	providedIn: 'root',
})
export class RoomsService {
	private rooms$ = new Subject<Room[]>();

	constructor(private http: HttpClient, private messageService: MessageService) {}

	newRoom(data: Room): Observable<Room> {
		return this.http.post<Room>('admin/rooms/create', data).pipe(
			filter((resp) => resp && !!resp),
			tap((resp) => {
				this.messageService.add({
					severity: 'success',
					summary: 'Completado',
					detail: resp.data.message,
				});
			}),
			catchError((err: HttpErrorResponse) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: err.error.data.message || err.message,
				});
				return throwError(() => err);
			})
		);
	}

	rooms(): Observable<Room> {
		return this.http.get<Room>('rooms').pipe(
			tap((res) => {
				this.rooms$.next(res.data.rooms);
			}),
			catchError((err: HttpErrorResponse) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Oh-no!',
					detail: 'No hay salas de soporte disponibles' 
				});
				return throwError(() => err);
			})
		);
	}

	getRooms(): Observable<Room[]> {
		return this.rooms$.asObservable();
	}

	/**
	 *
	 * @method randomRoom Toma una indice aleatorio de la lista de rooms y lo devuelve.
	 * @returns una sala aleatoria de la lista de salas
	 *
	 */
	randomRoom(): void {
		this.rooms$.subscribe((res) => {
			console.log(res);
		});
	}
}
