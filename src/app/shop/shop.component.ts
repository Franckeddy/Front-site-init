import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvService } from 'src/app/env.service';

@Component({
   selector: 'app-shop',
   templateUrl: './shop.component.html',
   styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
   products = [];
   prodSub: Subscription;

   constructor(private prodService: ProductsService, public env: EnvService) {}

   ngOnInit(): void {
      window.scrollTo(0, 0);
      this.prodSub = this.prodService.prodSubject.subscribe((data) => {
         this.products = this.prodService.getProductByPage(0);
      });
      this.prodService.emitProducts();
   }
}
