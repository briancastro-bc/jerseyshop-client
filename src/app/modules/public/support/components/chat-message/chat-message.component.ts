import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
	selector: 'chat-message',
	templateUrl: './chat-message.component.html',
	styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit, OnDestroy {
	@Input() username!: string | undefined;
	@Input() message!: string | undefined;
	@Input() time: string = new Date().toLocaleTimeString();

	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {}
}
