import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

import { RouteService } from '@shared/services/local/route.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	supportItems!: MenuItem[];

	constructor(private routeService: RouteService, private primeNgConfig: PrimeNGConfig) {}

	ngOnInit(): void {
		this.routeService.initRouteConfig();
		this.primeNgConfig.ripple = true;
		this.supportItems = [
			{
				icon: 'pi pi-users',
				tooltip: 'Ayuda',
				tooltipPosition: 'right'
			}
		]
	}
}
