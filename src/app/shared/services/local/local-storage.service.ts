import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	constructor() {}

	saveItem(key: string, value: any, isObject: boolean = false): void {
		if (isObject) {
			let itemToSave: any = JSON.stringify(value);
			localStorage.setItem(key, itemToSave);
			return;
		}
		localStorage.setItem(key, value);
	}

	updateItem(key: string, newValue: any, isObject: boolean = false): void {
		if (isObject) {
			this.saveItem(key, newValue, true);
			return;
		}
		this.saveItem(key, newValue);
	}

	getItem(key: string, isObject: boolean = false): string | object | null {
		if (isObject) {
			let item: any = localStorage.getItem(key);
			let object: object = JSON.parse(item || '{}');
			return object;
		}
		return localStorage.getItem(key);
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}
}
