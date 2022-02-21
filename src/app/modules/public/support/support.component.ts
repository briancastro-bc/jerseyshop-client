import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ISocket } from '@app/shared/interfaces';
import { SocketService } from '@app/shared/services/local';

@Component({
	selector: 'app-support',
	templateUrl: './support.component.html',
	styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit, OnDestroy {
	@ViewChild('messageInput') messageInput: ElementRef;
	messages: ISocket[] = [];
	room: string | undefined;

	constructor(
		private router: Router,
		private socketService: SocketService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.socketService.onMessage().subscribe((message) => {
			this.messages.push({
				message: message.message,
			});
		});
		this.room = this.socketService.room;
	}

	ngOnDestroy(): void {}

	sendChatMessage() {
		const room = this.socketService.room;
		const message = this.messageInput.nativeElement.value;
		this.messageInput.nativeElement.value = '';
		if (room == undefined) return;
		this.socketService.onSendMessage({
			room: room,
			message: message,
		});
	}

	leftRoom() {
		this.socketService.leaveRoom({
			room: this.room
		});
		this.socketService.onUserLeft().subscribe()
	}
}
