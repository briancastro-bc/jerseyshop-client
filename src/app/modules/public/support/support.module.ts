import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';


@NgModule({
  declarations: [
    SupportComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule,
  ]
})
export class SupportModule { }
