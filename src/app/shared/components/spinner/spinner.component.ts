import { Component } from '@angular/core';
import { SpinnerService } from '@shared/services/local';

@Component({
	selector: 'app-spinner',
	template: `
		<div class="overlay" *ngIf="this.spinnerService.isLoading$ | async">
			<div class="lds-grid">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	`,
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	constructor(public spinnerService: SpinnerService) {}
}
