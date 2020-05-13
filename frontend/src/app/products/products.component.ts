import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private cartService: CartService) {}

  displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    { id: 1, product: 'Shirt: solid', price: 20.0, quantity: 46 },
    { id: 2, product: 'Jeans: dark', price: 35.0, quantity: 20 },
    { id: 3, product: 'Sweater: knit', price: 27.0, quantity: 15 },
    { id: 4, product: 'Jeans: light', price: 37.0, quantity: 18 },
    { id: 5, product: 'Shirt: print', price: 23.0, quantity: 12 },
    { id: 6, product: 'Jacket: leather', price: 50.0, quantity: 23 },
    { id: 7, product: 'Jeans: ripped', price: 40.0, quantity: 30 },
    { id: 8, product: 'Jacket: zip-up', price: 32.0, quantity: 19 },
    { id: 9, product: 'Sweater: cable-knit', price: 26.0, quantity: 10 },
    { id: 10, product: 'Sweater: hooded', price: 1.0079, quantity: 24 },
  ];

  ngOnInit(): void {}

  stock;
  getInStock() {
    this.cartService.getAllItems().subscribe((res) => {
      this.stock = res;
      console.log('Item Data', this.stock);
    });
  }
}
