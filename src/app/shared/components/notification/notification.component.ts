import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications$ = this.notificationService.publicNotifications$;
  //notifications: Advertisement[];

  @HostBinding('class.is-open')
  isOpen: boolean = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getPublicNotifications().subscribe();
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
