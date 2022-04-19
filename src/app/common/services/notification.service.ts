import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';

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
    return this.http.get<Advertisement>('advertisements/').pipe(
      take(1),
      tap((response) => {
        const { data } = response;
        this.publicNotificationSubject$.next(data.advertisements);
      })
    );
  }

  getProtectedNotifications(): Observable<Advertisement> {
    return this.http.get<Advertisement>('admin/advertisements/').pipe(
      tap((response) => {
        const { data } = response;
        this.privateNotificationSubject$.next(data.advertisements);
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  createNotification(advertisement: Advertisement): Observable<Advertisement> {
    return this.http.post('admin/advertisements/', advertisement).pipe(
      take(1),
      filter(response => response && !!response),
      tap((response) => {
        this.message.success('Se ha creado el anuncio', 'Hecho');
      }),
      catchError((err: HttpErrorResponse) => {
        this.message.error('Algo ha ido mal creando la notificacion', 'Oh-no!');
        return throwError(() => err);
      })
    );
  }

  deleteNotification(uid: string): Observable<any> {
    return this.http.delete<any>(`admin/advertisements/${uid}`).pipe(
      take(1),
      filter(response => response && !!response),
      tap(
        response => {
          this.message.success('El anuncio ha sido eliminado', 'Hecho');
        }
      ),
      catchError((err: HttpErrorResponse) => {
        this.message.error(err.error.data.message || err.message, 'Oh-no!')
        return throwError(() => err);
      })
    )
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
