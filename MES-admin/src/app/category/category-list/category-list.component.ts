import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory, ISubCategory } from '../../Models/Interface/ICategoryList';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
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
  categories:any = [
    {
        _id: '1',
        parentId: '',
        description: 'Fruits',
        imageUrl: '',
        name: 'Fruits',
        subCategories: [
            {
                _id: '1-1',
                parentId: '1',
                description: 'Citrus Fruits',
                imageUrl: '',
                name: 'Citrus',
                subSubCategories: [
                    { _id: '1-1-1', parentId: '1-1', description: 'Oranges', imageUrl: '', name: 'Orange' },
                    { _id: '1-1-2', parentId: '1-1', description: 'Lemons', imageUrl: '', name: 'Lemon' }
                ]
            },
            {
                _id: '1-2',
                parentId: '1',
                description: 'Berries',
                imageUrl: '',
                name: 'Berries',
                subSubCategories: [
                    { _id: '1-2-1', parentId: '1-2', description: 'Strawberries', imageUrl: '', name: 'Strawberry' },
                    { _id: '1-2-2', parentId: '1-2', description: 'Blueberries', imageUrl: '', name: 'Blueberry' }
                ]
            }
        ]
    },
    {
        _id: '2',
        parentId: '',
        description: 'Vegetables',
        imageUrl: '',
        name: 'Vegetables',
        subCategories: [
            {
                _id: '2-1',
                parentId: '2',
                description: 'Leafy Vegetables',
                imageUrl: '',
                name: 'Leafy',
                subSubCategories: [
                    { _id: '2-1-1', parentId: '2-1', description: 'Spinach', imageUrl: '', name: 'Spinach' },
                    { _id: '2-1-2', parentId: '2-1', description: 'Lettuce', imageUrl: '', name: 'Lettuce' }
                ]
            }
        ]
    }
  ]
  constructor( private router:Router,private common:CommonService,private fb: FormBuilder){
      this.GetCategoryList(this.searchValue,this.currentPage);
      this.form = this.fb.group({
        category: [null],
        subCategory: [null],
        subSubCategory: [null]
    });
    }


    async GetCategoryList(search:string,page:number){
      Notiflix.Loading.circle()
      try {
         let response=(await this.common.GetCategories()).data        
         this.categoryList=response.data;
        Notiflix.Loading.remove()
      } catch (error:any) {
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(error.response.data.message)
      }
    }

  EditCategory(id:any){
    this.router.navigate(['/category',id])
  }

  async DeleteCategory(id:any){
    Notiflix.Loading.circle()
    try {
      let response=(await this.common.DeleteCategory(id)).data
      Notiflix.Notify.success(`response.message`)
      Notiflix.Loading.remove()

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
}
