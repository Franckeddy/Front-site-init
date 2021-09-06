import { environment } from './../../../environments/environment';
import { Products } from './../../model/products';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';

@Component({
   selector: 'app-modal-add-to-cart',
   templateUrl: './modal-add-to-cart.component.html',
   styleUrls: ['./modal-add-to-cart.component.scss'],
})
export class ModalAddToCartComponent implements OnInit {
   @Input() products: Products[];

   constructor(
      private env: EnvService,
   ) {}

   ngOnInit(): void {}
}
