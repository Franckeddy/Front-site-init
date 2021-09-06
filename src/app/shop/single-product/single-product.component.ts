import { Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Products } from './../../model/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { EnvService } from 'src/app/env.service';

@Component({
   selector: 'app-single-product',
   templateUrl: './single-product.component.html',
   styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
   product: Products;
   productSub: Subscription;

   constructor(
      private route: ActivatedRoute,
      private prodService: ProductsService,
      private cartService: CartService,
      public env: EnvService
   ) {}

   ngOnInit(): void {
      window.scrollTo(0, 0);
      const id = +this.route.snapshot.params['id'];

      this.productSub = this.prodService.prodSubject.subscribe(
         (data: Products[]) => {
            this.product = this.prodService.getProductById(id);
         }
      );
      this.prodService.emitProducts();
   }

   addCart(product: Products): void {
      this.cartService.addProductToCard(product);
   }
}
