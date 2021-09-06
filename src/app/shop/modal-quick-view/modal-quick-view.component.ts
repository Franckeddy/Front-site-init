import { environment } from './../../../environments/environment';
import { Products } from './../../model/products';
import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { EnvService } from 'src/app/env.service';

@Component({
   selector: 'app-modal-quick-view',
   templateUrl: './modal-quick-view.component.html',
   styleUrls: ['./modal-quick-view.component.scss'],
})
export class ModalQuickViewComponent implements OnInit {
   @Input() products: Products[];

   constructor(
      private cartService: CartService,
      private env: EnvService
      ) {}

   ngOnInit(): void {}

   addCart(product: Products): void {
      this.cartService.addProductToCard(product);
   }
}
