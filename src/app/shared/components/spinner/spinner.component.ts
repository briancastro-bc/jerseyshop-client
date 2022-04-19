import { Component } from '@angular/core';
import { SpinnerService } from '@shared/services/local';

@Component({
	selector: 'app-spinner',
	template: `
		<div class="progress-bar" *ngIf="this.spinnerService.isLoading$ | async">
			<div class="progress-bar-value"></div>
		</div>
	`,
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	constructor(public spinnerService: SpinnerService) {}
}
