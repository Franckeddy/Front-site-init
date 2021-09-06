import { Router } from '@angular/router';
import { Users } from './../../model/users';
import { UsersService } from './../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
   registerForm: FormGroup;
   errorMessage;
   successMessage;

   constructor(
      private fb: FormBuilder,
      private userService: UsersService,
      private router: Router
   ) {}

   ngOnInit(): void {
      window.scrollTo(0, 0);
      this.initRegisterForm();
   }

   initRegisterForm(): void {
      this.registerForm = this.fb.group({
         pseudo: this.fb.control('', [Validators.required]),
         lastname: this.fb.control('', [Validators.required]),
         firstname: this.fb.control('', [
            Validators.required,
            Validators.minLength(5),
         ]),
         email: this.fb.control('', [Validators.required, Validators.email]),
         password: this.fb.control('', [
            Validators.required,
            Validators.minLength(6),
         ]),
      });
   }

   onSubmit(): void {
      const pseudoUser = this.registerForm.get('pseudo').value;
      const firstnameUser = this.registerForm.get('firstname').value;
      const lastnameUser = this.registerForm.get('lastname').value;
      const emailUser = this.registerForm.get('email').value;
      const passwordUser = this.registerForm.get('password').value;

      const newUser: Users = {
         firstname: firstnameUser,
         lastname: lastnameUser,
         email: emailUser,
         password: passwordUser,
         pseudo: pseudoUser,
      };

      this.userService.createUser(newUser)
         .then(
            (data) => {
            this.errorMessage = null;
            this.successMessage = data;
            setTimeout(() => {
               this.successMessage = null;
               this.router.navigate(['/shop']);
            }, 1500);
            }
         )
         .catch((error) => {
            this.errorMessage = error;
            setTimeout(() => {
               this.errorMessage = null;
            }, 1500);
            console.log(error);
         });
   }
}
