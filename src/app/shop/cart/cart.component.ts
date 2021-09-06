import { CartService } from '../../services/cart.service';
import { Cart } from '../../model/cart';
import { Products } from '../../model/products';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { EnvService } from '../../env.service';

@Component({
   selector: 'app-cart',
   templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
   cart: Cart[] = [];

   constructor(private cartService: CartService,
               private env: EnvService
               ) { }

   ngOnInit(): void {
      this.cart = this.cartService.cart;
   }

   addProduct(product: Products): void {
      this.cartService.addProductToCard(product);
   }

   deleteProduct(product: Products): void {
      this.cartService.deleteFromCart(product);
   }

   removeProduct(index: number): void {
      this.cartService.removeElementOfCart(index);
   }

   removeAllProducts(): void {
      this.cartService.removeAllElementsOfCart();
   }
}
