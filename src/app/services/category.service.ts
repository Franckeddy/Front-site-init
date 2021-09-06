import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
   providedIn: 'root',
})
export class CategoryService {
   categories: Category[];
   categorySubject = new Subject<Category[]>();

   constructor(private http: HttpClient,
               private env: EnvService) {
      this.getCategoryFromServer();
   }

   emitCategories(): void {
      this.categorySubject.next(this.categories);
   }
   getCategoryFromServer(): void {
      const url = `${this.env.API + 'category?' + this.env.API_KEY}`;
      this.http.get(url).subscribe((response: Result) => {
         if (response.status == 200) {
            this.categories = response.result;
            this.emitCategories();
         } else {
            console.log(response.message);
         }
      });
   }
}
