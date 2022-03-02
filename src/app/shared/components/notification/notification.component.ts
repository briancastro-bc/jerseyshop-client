import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';

import { NotificationService } from '@app/common/services';
import { Advertisement } from '@app/common/interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  //notifications$: Observable<Advertisement[]> = this.notificationService.notifications$;
  notifications: Advertisement[] = []

  @HostBinding('class.is-open')
  isOpen: boolean = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(
      response => {
        this.notifications = response.data.advertisements;
      }
    );
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
