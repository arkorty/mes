import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory, ISubCategory } from '../../Models/Interface/ICategoryList';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,
    MatTreeModule,MatIconModule,MatExpansionModule,
    MatButtonModule,],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  searchValue: string=''
  currentPage:number=1
  totalCount:number=0;
  form!: FormGroup;
  categoryList: ICategory[] = []; // This will hold the categories from the response
  selectedCategory: ICategory | null = null;
  selectedSubCategory: ISubCategory | null = null;
  categories:ICategory[] = [];
  constructor( private router:Router,private common:CommonService,private fb: FormBuilder){
      this.GetCategoryList();
      this.form = this.fb.group({
        category: [null],
        subCategory: [null],
        subSubCategory: [null]
    });
    }


    async GetCategoryList(){
      Notiflix.Loading.circle()
      try {
         let response=(await this.common.GetCategories()).data   
         this.categoryList=response.data.data;
         Notiflix.Loading.remove()
      } catch (error:any) {
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(error.response.data.message)
      }
    }

  async DeleteItem(id:any){
    event?.stopPropagation();
    Notiflix.Loading.circle()
    try {
      debugger
      let response=(await this.common.DeleteCategory(id)).data
      
      debugger
      Notiflix.Notify.success(response.message)
     
      Notiflix.Loading.remove()
      window.location.reload()

    } catch (error:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(error.response.data.message)
    }
  }

  AddCategory(){
    this.router.navigate(['category/0'])
  }

onCategoryChange() {
    const categoryId = this.form.get('category')?.value;
    this.selectedCategory = this.categories.find((cat:any) => cat._id === categoryId) || null;

    // Reset subcategory and sub-subcategory selections
    this.form.patchValue({ subCategory: null, subSubCategory: null });
    this.selectedSubCategory = null; // Reset selected subcategory
}

onSubCategoryChange() {
    const subCategoryId = this.form.get('subCategory')?.value;
    this.selectedSubCategory = this.selectedCategory?.subCategories.find((sub:any) => sub._id === subCategoryId) || null;

    // Reset sub-subcategory selection
    this.form.patchValue({ subSubCategory: null });
}

EditItem(id:string){
  event?.stopPropagation();
  this.router.navigate(['/category',id])
}

}
