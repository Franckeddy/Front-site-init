import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
   constructor(private categoryService: CategoryService) {}

   categories: Category[];
   categorySub: Subscription;

   ngOnInit(): void {
      this.categorySub = this.categoryService.categorySubject.subscribe(
         (data: Category[]) => {
            this.categories = data;
         }
      );
      this.categoryService.emitCategories();
   }
}
