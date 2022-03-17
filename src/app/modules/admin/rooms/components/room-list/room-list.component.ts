import { Component, OnInit } from '@angular/core';

import { RoomsService } from '@common/services';
import { Room } from '@common/interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-room-list',
	templateUrl: './room-list.component.html',
	styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {

	privateRooms$: Observable<Room[]> = this.roomsService.privateRooms$;

	constructor(
		private roomsService: RoomsService
	) {}

	ngOnInit(): void {
		this.roomsService.getPrivatedRooms().subscribe();
	}
}
