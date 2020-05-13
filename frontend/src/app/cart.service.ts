import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get('/api/cart-items', {
      responseType: 'json',
    });
  }
}
