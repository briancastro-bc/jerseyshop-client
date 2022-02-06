import { Component } from '@angular/core';
import { SpinnerService } from '@shared/services/local';

@Component({
	selector: 'app-spinner',
	template: `
		<div class="overlay" *ngIf="this.spinnerService.isLoading$ | async">
			<div class="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="loading">
				<span class="text-muted">Cargando...</span>
			</div>
		</div>
	`,
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	constructor(public spinnerService: SpinnerService) {}
}
