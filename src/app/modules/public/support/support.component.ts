import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Support } from '@app/common/interfaces';
import { SupportRoomService } from '@common/services';

@Component({
	selector: 'app-support',
	templateUrl: './support.component.html',
	styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit, OnDestroy {

	@ViewChild('messageInput') messageInput: ElementRef;
	messages: Support[] = [];
	people: any[];
	rooms: any[];
	room: string | undefined;

	constructor(
		private supportRoomService: SupportRoomService,
	) {
		this.people = [
			{
				name: 'Brian',
				label: 'B'
			},
			{
				name: 'Santiago',
				label: 'S'
			},
			{
				name: 'Alejandro',
				label: 'A'
			},
			{
				name: 'Juan',
				label: 'J'
			},
		]
		this.rooms = [
			{
				name: 'Soporte 1',
				label: 'S1',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 2',
				label: 'S2',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 3',
				label: 'S3',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 4',
				label: 'S4',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 4',
				label: 'S4',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 4',
				label: 'S4',
				description: 'Lorem ipsum asd iluil'
			},
			{
				name: 'Soporte 4',
				label: 'S4',
				description: 'Lorem ipsum asd iluil'
			},
		]
	}

	ngOnInit(): void {
		this.supportRoomService.onMessage().subscribe((message) => {
			this.messages.push({
				message: message.message,
			});
		});
		this.room = this.supportRoomService.room;
	}

	ngOnDestroy(): void {}

	sendChatMessage() {
		const room = this.supportRoomService.room;
		const message = this.messageInput.nativeElement.value;
		this.messageInput.nativeElement.value = '';
		if (room == undefined) return;
		this.supportRoomService.onSendMessage({
			room: room,
			message: message,
		});
	}

	leftRoom() {
		this.supportRoomService.leaveRoom({
			room: this.room
		});
		this.supportRoomService.onUserLeft().subscribe()
	}
}
