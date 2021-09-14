import { UsersService } from './../../services/users.service';
import { OrdersService } from './../../services/orders.service';
import { Cart } from './../../model/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
   selector: 'app-checkout',
   templateUrl: './checkout.component.html',
   styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
   cart: Cart[];
   cartData;

   constructor(
      private cartService: CartService,
      private ordersService: OrdersService,
      private userService: UsersService,
      public translate: TranslateService
   ) {
      this.cart = this.cartService.cart;
      this.cartData = this.cartService.cartData;
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');
   }

   ngOnInit(): void {}
}
