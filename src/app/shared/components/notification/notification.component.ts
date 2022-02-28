import { Component, HostBinding, Input, OnInit, OnDestroy, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { elementAt, map, Observable, Subject } from 'rxjs';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/shared/interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications$: Observable<Advertisement[]> = this.notificationService.notifications$;

  @HostBinding('class.is-open')
  isOpen: boolean = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe();
    this.notificationService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  ngOnDestroy(): void {
    //this.data.unsubscribe();
  }

  reload(): void {
    this.ngOnInit();
  }

  goToUrl(hyperlink: string) {
    document.location.href = hyperlink;
  }
}
