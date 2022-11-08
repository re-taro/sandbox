import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Product } from "./products";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Array<Product> = [];

  constructor(private httpClient: HttpClient) { }

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems(): Array<Product> {
    return this.items;
  }

  clearCart(): Array<Product> {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.httpClient.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}
