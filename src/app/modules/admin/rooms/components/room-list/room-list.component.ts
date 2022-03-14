import { Component, OnInit } from '@angular/core';

import { RoomsService } from '@common/services';
import { Room } from '@common/interfaces';

@Component({
	selector: 'app-room-list',
	templateUrl: './room-list.component.html',
	styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
	data: Room[];

	constructor(private roomsService: RoomsService) {}

	ngOnInit(): void {
		this.roomsService.rooms().subscribe((res) => {
			this.data = res.data.rooms;
		});
	}
}
