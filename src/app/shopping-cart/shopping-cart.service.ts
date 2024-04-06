import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private readonly httpClient: HttpClient) {}

  getProductsDetailsFromJSON() {
    return this.httpClient.get('assets/mocks/products.json');
  }
}
