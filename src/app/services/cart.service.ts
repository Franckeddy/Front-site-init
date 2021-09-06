import { Products } from './../model/products';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class CartService {
   cart: Cart[] = [];
   cartData = {
      len: 0, cost: 0
   };

   constructor() {
      this.initCart();
   }

   initCart(): void {
      if (typeof(localStorage) !== 'undefined') {
         const cart = JSON.parse(localStorage.getItem('cart')!);
         const cartData = JSON.parse(localStorage.getItem('cartData')!);
         this.cart = cart ? cart : [];
         this.cartData = cartData ? cartData : {
            lenght: 0,
            cost: 0
         };
      } else {
         this.cart = [];
         this.cartData = {
            len: 0,
            cost: 0
         };
      }
   }

   updateDataCart(): void {
      let len = 0;
      let cost = 0;
      this.cart.forEach((element) => {
         len += element.number;
         cost += element.product.price * element.number;
      });
      this.cartData.len = len;
      this.cartData.cost = parseFloat(cost.toFixed(2));
      if (typeof(localStorage) !== 'undefined') {
         localStorage.setItem('cart', JSON.stringify(this.cart));
         localStorage.setItem('cartData', JSON.stringify(this.cartData));
      }
   }

   addProductToCard(newProduct: Products): void {
      const checkedProduct = this.cart.find(element => element.product === newProduct);
      if (checkedProduct) {
         checkedProduct.number++;
      } else {
         const newProductToAdd = {
            number: 1,
            product: newProduct,
         };
         this.cart.push(newProductToAdd);
      }
      this.updateDataCart();
   }

   deleteFromCart(productToDelete: Products): void {
      const indexProduct = this.cart.findIndex(element => element.product === productToDelete);
      if (indexProduct !== -1) {
         if (this.cart[indexProduct].number > 1) {
            this.cart[indexProduct].number--;
         } else {
            this.cart.splice(indexProduct, 1);
         }
      }
      this.updateDataCart();
   }

   removeElementOfCart(index: number): void {
      this.cart.splice(index, 1);
      this.updateDataCart();
   }

   removeAllElementsOfCart(): void {
      this.cart.pop();
      this.updateDataCart();
   }
}
