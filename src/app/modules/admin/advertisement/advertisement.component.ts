import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';
import { AdvertisementCreateComponent } from './components/advertisement-create/advertisement-create.component';

@Component({
	selector: 'app-advertisement',
	templateUrl: './advertisement.component.html',
	styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {

	privateNotifications$: Observable<Advertisement[]> = this.notificationService.privateNotifications$;
	advertisementEditOrUpdateForm: FormGroup = this.formBuilder.group({
		hyperlink: ['', []],
		description: ['', []]
	})
	search: string;

	constructor(
		private notificationService: NotificationService,
		private dialogService: DialogService,
		private confirmation: ConfirmationService,
		private formBuilder: FormBuilder
	) {	}

	ngOnInit(): void {
		this.notificationService.getProtectedNotifications().subscribe();
	}

	confirmDelete(event: Event, uid?: string): void {
		this.confirmation.confirm({
			target: event.target!,
			message: '¿Estás seguro de que quieres eliminar el anuncio?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.delete(uid);
			}
		});
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

	delete(uid?: string): void {
		this.notificationService.deleteNotification(uid!).subscribe();
	}

	onDescriptionChange(value: any): void {
		console.log(value)
	}
}
