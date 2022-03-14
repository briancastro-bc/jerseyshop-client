import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { Advertisement } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private publicNotificationSubject$ = new BehaviorSubject<Advertisement[]>([]);
  publicNotifications$ = this.publicNotificationSubject$.asObservable();

  private privateNotificationSubject$ = new BehaviorSubject<Advertisement[]>([]);
  privateNotifications$ = this.privateNotificationSubject$.asObservable();

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  isOpen: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private message: MessageService
  ) {}

  getPublicNotifications(): Observable<Advertisement> {
    return this.http.get<Advertisement>('advertisements').pipe(
      take(1),
      tap((response) => {
        const { data } = response;
        this.publicNotificationSubject$.next(data.advertisements);
      })
    );
  }

  getProtectedNotifications(): Observable<Advertisement> {
    return this.http.get<Advertisement>('admin/advertisements').pipe(
      tap((response) => {
        const { data } = response;
        this.privateNotificationSubject$.next(data.advertisements);
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  createNotification(advertisement: Advertisement): Observable<any> {
    return this.http.post('admin/advertisements/create', advertisement).pipe(
      catchError((err: HttpErrorResponse) => {
        this.message.error('Algo ha ido mal creando la notificacion', 'Oh-no!');
        return throwError(() => err);
      })
    );
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
