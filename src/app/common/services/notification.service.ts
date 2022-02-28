import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Advertisement } from '@app/shared/interfaces';
import { from, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject$: Subject<Advertisement[]> = new Subject<Advertisement[]>();
  notifications$: Observable<Advertisement[]> = this.notificationSubject$.asObservable();

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  isOpen: boolean = false;


  constructor(
    private readonly http: HttpClient
  ) {}

  getNotifications(): Observable<Advertisement> {
    return this.http.get<Advertisement>('advertisements').pipe(
      tap(response => {
        const { data } = response;
        this.notificationSubject$.next(data.advertisements);
      })
    );
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
