import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { UsersService } from './../../services/users.service';
import { OrdersService } from './../../services/orders.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Component, Input, OnInit } from '@angular/core';
import { EnvService } from 'src/app/env.service';

@Component({
   selector: 'app-button-paypal',
   templateUrl: './button-paypal.component.html',
   styleUrls: ['./button-paypal.component.scss'],
})
export class ButtonPaypalComponent implements OnInit {
   @Input() price: string;
   payPalConfig: IPayPalConfig;

   constructor(
      private ordersService: OrdersService,
      private userService: UsersService,
      private cartService: CartService,
      private router: Router,
      private env: EnvService
   ) {}

   ngOnInit(): void {
      this.initConfig();
   }

   initConfig(): void {
      const price = this.price;
      const currency = this.env.CURRENCY;
      const clientId = this.env.ID_CLIENT_PAYPAL;

      this.payPalConfig = {
         currency: currency,
         clientId: clientId,
         // tslint:disable-next-line: no-angle-bracket-type-assertion
         createOrderOnClient: (data) =>
            <ICreateOrderRequest>{
               intent: 'CAPTURE',
               purchase_units: [
                  {
                     amount: {
                        currency_code: currency,
                        value: price,
                        breakdown: {
                           item_total: {
                              currency_code: currency,
                              value: price,
                           },
                        },
                     },
                     items: [
                        {
                           name: 'PAIEMENT OMNISTORE SHOP',
                           quantity: '1',
                           category: 'PHYSICAL_GOODS',
                           unit_amount: {
                              currency_code: currency,
                              value: price,
                           },
                        },
                     ],
                  },
               ],
            },
         advanced: {
            commit: 'true',
         },
         style: {
            label: 'paypal',
            layout: 'vertical',
         },
         onApprove: (data, actions) => {
            console.log(
               'onApprove - transaction was approved, but not authorized',
               data,
               actions
            );
            const user = this.userService.user;
            const cart = this.cartService.cart;

            this.ordersService
               .createOrders(user, cart)
               .then(() => {
                  console.log('commande créée avec succès !');
               })
               .catch((error) => {
                  console.log(error);
               });
            actions.order.get().then((details) => {
               console.log(
                  'onApprove - you can get full order details inside onApprove: ',
                  details
               );
            });
         },
         onClientAuthorization: (data) => {
            console.log(
               'onClientAuthorization - you should probably inform your server about completed transaction at this point',
               data
            );
         },
         onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
         },
         onError: (err) => {
            console.log('OnError', err);
         },
         onClick: (data, actions) => {
            console.log('onClick', data, actions);
         },
      };
   }
}
