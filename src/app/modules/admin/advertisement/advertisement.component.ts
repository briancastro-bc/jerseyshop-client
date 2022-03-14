import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';
import { AdvertisementCreateComponent } from './components/advertisement-create/advertisement-create.component';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-advertisement',
	templateUrl: './advertisement.component.html',
	styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {

	privateNotifications$: Observable<Advertisement[]> = this.notificationService.privateNotifications$;
	advertisementOptions: MenuItem[];
	search: string;

	constructor(
		private notificationService: NotificationService,
		private dialogService: DialogService
	) {	
		this.advertisementOptions = [
			{
				label: 'Editar',
				icon: 'pi pi-pencil',
				command: () => {

				}
			},
			{
				label: 'Eliminar',
				icon: 'pi pi-trash',
				command: () => {

				}
			}
		]
	}

	ngOnInit(): void {
		this.notificationService.getProtectedNotifications().subscribe();
	}

	create(): void {
		this.dialogService.open(AdvertisementCreateComponent, {
			header: 'Crear nuevo anuncio',
			width: '70vw',
			styleClass: 'create-dialog',
			closeOnEscape: false,
			showHeader: true,
		});
	}
}
