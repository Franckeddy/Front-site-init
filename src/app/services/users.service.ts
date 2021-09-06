import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
   providedIn: 'root',
})
export class UsersService {
   user: Users;
   isAuth = false;
   userSubject = new Subject<Users>();

   constructor(private http: HttpClient,
               private env: EnvService
               ) {}

   emitUser(): void {
      this.userSubject.next(this.user);
   }

   authentifier(newUser: Users) {
      return new Promise((resolve, reject) => {
         const url =
            `${this.env.API + 'authentifier.php?' + this.env.API_KEY}` +
            '&email=' +
            newUser.email +
            '&password=' +
            newUser.password;

         this.http.get(url).subscribe(
            (data: Result) => {
               if (data.status === 200) {
                  this.user = data.result;
                  this.isAuth = true;
                  this.emitUser();
                  resolve(data.result);
               } else {
                  console.log(data.result);
                  reject(data.message);
               }
            },
            (error) => {
               console.log('error : ' + error);
               reject(false);
            }
         );
      });
   }

   createUser(newUser: Users) {
      return new Promise((resolve, reject) => {
         const url =
            `${this.env.API + 'createUsers.php?' + this.env.API_KEY}` +
            '&email=' +
            newUser.email +
            '&password=' +
            newUser.password +
            '&firstname=' +
            newUser.firstname +
            '&lastname=' +
            newUser.lastname +
            '&pseudo=' +
            newUser.pseudo;

         this.http.get<Result>(url).subscribe(
            (data: Result) => {
               console.log(data);

               if (data.status === 200) {
                  this.user = data.args;
                  this.isAuth = true;
                  this.emitUser();
                  resolve(data.result);
               } else {
                  reject(data.message);
               }
            },
            (error) => {
               reject(error);
            }
         );
      });
   }

   logout(): void {
      this.user = null;
      this.isAuth = false;
      this.userSubject = new Subject<Users>();
   }
}
