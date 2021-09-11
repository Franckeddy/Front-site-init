import { NgxPayPalModule } from 'ngx-paypal';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';

import { RouterModule, Routes } from '@angular/router';
import { ModalAddToCartComponent } from './shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { ButtonPaypalComponent } from './shop/button-paypal/button-paypal.component';
import { SliderComponent } from './shop/slider/slider.component';
import { EnvServiceProvider } from './env.service.provider';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
   { path: 'about', component: HomeComponent },
   { path: 'shop', component: ShopComponent },
   { path: 'cart', component: CartComponent },
   { path: 'single-product/:id', component: SingleProductComponent },
   { path: 'category/:id', component: CategoryComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'notFound', component: NotFoundComponent },
   { path: '', component: ShopComponent },
   { path: '**', redirectTo: 'notFound', pathMatch: 'full' },
];
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      ContactComponent,
      LoginComponent,
      RegisterComponent,
      ShopComponent,
      ProductsComponent,
      SingleProductComponent,
      CartComponent,
      ModalAddToCartComponent,
      ModalQuickViewComponent,
      CategoryComponent,
      CheckoutComponent,
      ButtonPaypalComponent,
      SliderComponent,
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPayPalModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
         }
      }),
      BrowserAnimationsModule,
      MatSliderModule,
      MatInputModule,
      MatSelectModule
   ],
   providers: [HttpClientModule, EnvServiceProvider],
   bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
   return new TranslateHttpLoader(http);
}
