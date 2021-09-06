import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Users } from './../../model/users';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;
   errorMessage;

   constructor(
      private userService: UsersService,
      private router: Router,
      private fb: FormBuilder,
      private cartService: CartService
   ) {}

   ngOnInit(): void {
      window.scrollTo(0, 0);
      this.initFormLogin();
   }

   initFormLogin(): void {
      this.loginForm = this.fb.group({
         email: this.fb.control('', Validators.email),
         password: this.fb.control('', Validators.minLength(6)),
      });
   }

   onSubmit(): void {
      const email = this.loginForm.get('email').value;
      const newUser: Users = { email: email };
      this.userService
         .authentifier(newUser)
         .then((data) => {
            const cart = this.cartService.cart;
            if (cart.length) {
               this.router.navigate(['/']);
            } else {
               this.router.navigate(['/shop']);
            }
         })
         .catch((error) => {
            this.errorMessage = error;
            setTimeout(() => {
               this.errorMessage = null;
            }, 1500);
            console.log(error);
         });
   }
}
