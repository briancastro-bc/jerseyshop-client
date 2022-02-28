import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { MessageService, ConfirmationService } from 'primeng/api';

import { environment } from '@env/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@shared/shared.module';
import { httpInterceptorsProviders } from '@common/http-interceptors';
import { NotificationService } from './common/services';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule,
		SharedModule, //Own module with all project dependencies
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
		SocketIoModule.forRoot({
			url: `${environment.socket_endpoint}/support`,
			options: {
				autoConnect: true,
				reconnectionDelayMax: 20000,
			},
		}),
		ToastrModule.forRoot({
			closeButton: true,
			timeOut: 5000,
			extendedTimeOut: 2000,
			progressBar: true,
			positionClass: 'toast-top-right',
			tapToDismiss: true,
			onActivateTick: true,
			maxOpened: 3,
			autoDismiss: true,
			//iconClasses: {},
			preventDuplicates: true,
		}),
	],
	providers: [
		MessageService, 
		ConfirmationService, 
		NotificationService,
		httpInterceptorsProviders
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
