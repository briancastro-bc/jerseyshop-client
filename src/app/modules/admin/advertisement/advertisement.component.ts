import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';
import { AdvertisementCreateComponent } from './components/advertisement-create/advertisement-create.component';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-advertisement',
	templateUrl: './advertisement.component.html',
	styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {

	privateNotifications$: Observable<Advertisement[]> = this.notificationService.privateNotifications$;
	search: string;

	constructor(
		private notificationService: NotificationService,
		private dialogService: DialogService
	) {	}

	ngOnInit(): void {
		this.notificationService.getProtectedNotifications().subscribe();
	}

	create(): void {
		this.dialogService.open(AdvertisementCreateComponent, {
			header: 'Crear nuevo anuncio',
			width: '80vw',
			styleClass: 'create-dialog',
			closeOnEscape: false,
			showHeader: true,
		});
	}
}
