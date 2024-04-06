import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  productDetails: any = [];

  constructor(private readonly shoopingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoopingCartService.getProductsDetailsFromJSON().subscribe({
      next: (response: any) => {
        this.productDetails = response;
        console.info('Response', this.productDetails);
      },
      error: (error: any) => {
        console.error('Error', error);
      },
    });
  }
}
