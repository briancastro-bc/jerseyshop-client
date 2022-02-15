import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//PrimeNG
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SpeedDialModule } from 'primeng/speeddial';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';

import { HelpComponent, NavbarComponent, SpinnerComponent } from '@shared/components';

@NgModule({
  declarations: [
    SpinnerComponent,
    NavbarComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ScrollTopModule,
    TooltipModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    PanelMenuModule,
    SpeedDialModule,
    ConfirmDialogModule,
    CardModule,
    ToolbarModule,
    ImageModule,
    AvatarModule,
    BadgeModule,
    InputTextModule
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    HelpComponent,
    ToastModule,
    ScrollTopModule,
    TooltipModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    PanelMenuModule,
    SpeedDialModule,
    ConfirmDialogModule,
    CardModule,
    ToolbarModule,
    ImageModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
  ]
})
export class SharedModule { }
