import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//PrimeNG components.
import { SpeedDialModule } from 'primeng/speeddial';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, SpeedDialModule],
})
export class HomeModule {}
