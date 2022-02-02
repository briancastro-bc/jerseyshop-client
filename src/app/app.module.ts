import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule } from 'ngx-socket-io';

/**
 * {PrimeNG} - Modules
 */
import { ToastModule } from 'primeng/toast';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { httpInterceptorsProviders } from '@shared/http-interceptors';
import { TokenService } from '@shared/services/local';
import { environment } from '@env/environment';

@NgModule({
	declarations: [AppComponent, SpinnerComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		ToastModule,
		ScrollTopModule,
		TooltipModule,
		StepsModule,
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
				reconnectionDelayMax: 20000
			}
		}),
	],
	providers: [
		TokenService,
		MessageService,
		httpInterceptorsProviders
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
