import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	products: any[];
	responsiveCarousel: any;

	constructor() {
		this.responsiveCarousel = [
			{
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 3,
			},
			{
				breakpoint: '768px',
				numVisible: 2,
				numScroll: 2,
			},
			{
				breakpoint: '560px',
				numVisible: 1,
				numScroll: 1,
			},
		];
	}

	ngOnInit(): void {
		this.products = [
			{
				image: 'https://static.eldiario.es/clip/397f6e34-93b0-40da-be39-00b2abc20e1e_16-9-discover-aspect-ratio_default_0.jpg'
			},
			{
				image: 'https://static.eldiario.es/clip/397f6e34-93b0-40da-be39-00b2abc20e1e_16-9-discover-aspect-ratio_default_0.jpg'
			},
			/*{
				image: 'https://static.eldiario.es/clip/397f6e34-93b0-40da-be39-00b2abc20e1e_16-9-discover-aspect-ratio_default_0.jpg'
			},
			{
				image: 'https://static.eldiario.es/clip/397f6e34-93b0-40da-be39-00b2abc20e1e_16-9-discover-aspect-ratio_default_0.jpg'
			},
			{
				image: 'https://static.eldiario.es/clip/397f6e34-93b0-40da-be39-00b2abc20e1e_16-9-discover-aspect-ratio_default_0.jpg'
			}*/
		]
	}
}
