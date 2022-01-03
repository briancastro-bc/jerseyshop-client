import { Component, OnInit } from '@angular/core';
import { RouteService } from '@shared/services/local/route.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	constructor(private routeService: RouteService) {}

	ngOnInit(): void {
		this.routeService.initRouteConfig();
	}
}
