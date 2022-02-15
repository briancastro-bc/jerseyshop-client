import { BehaviorSubject, Observable } from 'rxjs';

/**
 *
 * @class StorageService - Se usa para almacenar los datos persistentes
 * usando observables con clave:valor.
 *
 */
export class StorageService {
	private storage: Storage;
	private subjects: Map<string, BehaviorSubject<any>>;

	constructor(storage: Storage) {
		this.storage = storage;
		this.subjects = new Map<string, BehaviorSubject<any>>();
	}

	watch(key: string): Observable<any> {
		if (!this.subjects.has(key))
			this.subjects.set(key, new BehaviorSubject<any>(null));
		let item =
			this.storage.getItem(key) !== 'undefined' ? this.storage.getItem(key) : '';
		if (!item || item === 'undefined') {
			item = null;
		} else {
			item = JSON.parse(item);
		}
		this.subjects.get(key).next(item);
		return this.subjects.get(key).asObservable();
	}
}
