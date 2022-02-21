import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private randomMessages: any = {
    success: [
      ""
    ],
    error: [],
    info: [],
    warning: []
  }

  constructor(
    private toastr: ToastrService
  ) { }

  success(detail?: string, title?: string): void {
    const message: string|undefined = detail ? detail : this.random('success');
    this.toastr.success(message, title);
  }

  error(detail?: string, title?: string): void {
    const message: string|undefined = detail ? detail : this.random('error');
    this.toastr.error(message, title);
  }

  info(detail?: string, title?: string): void {
    const message: string|undefined = detail ? detail : this.random('info');
    this.toastr.info(message, title);
  }

  warning(detail?: string, title?: string): void {
    const message: string|undefined = detail ? detail : this.random('warning');
    this.toastr.warning(message, title);
  }

  private random(type: string): string {
    const random: number = Math.floor(Math.random() * (this.randomMessages.success.length));
    switch(type) {
      case 'success': {
        return this.randomMessages.success[random];
      }
      case 'error': {
        return this.randomMessages.error[random];
      }
      case 'info': {
        return this.randomMessages.info[random];
      }
      case 'warning': {
        return this.randomMessages.warning[random];
      }
      default: {
        return ""
      }
    }
  }
}
