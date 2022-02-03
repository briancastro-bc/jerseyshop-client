import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { SocketService } from '@shared/services/local';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	items!: MenuItem[];

	constructor(private socketService: SocketService) {}

	ngOnInit(): void {
		this.items = [
			{
				icon: 'pi pi-shield',
				command: () => {
					this.socketService.createRoom({}).subscribe(res => console.log(res))
				}
			}
		]
			
	}
}
