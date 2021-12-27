import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SpinnerService {
	isLoading$: Subject<boolean> = new Subject<boolean>();

	showSpinner(): void {
		this.isLoading$.next(true);
	}

	hideSpinner(): void {
		this.isLoading$.next(false);
	}
}
