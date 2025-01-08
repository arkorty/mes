import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common/common.service';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  searchValue: string=''
  currentPage:number=1
  categoryList:any[] = []
  totalCount:number=0;

  constructor( private router:Router,private common:CommonService){
      this.GetCategoryList(this.searchValue,this.currentPage);
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
}
