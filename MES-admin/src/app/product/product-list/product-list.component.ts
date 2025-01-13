import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  searchValue: string=''
  currentPage:number=1
  productList:any[] = []
  totalCount:number=0;

  constructor( private router:Router,private common:CommonService){
    //  this.GetProductList(this.searchValue,this.currentPage);
    }


        async GetProductList(search:string,page:number){
          Notiflix.Loading.circle()
          try {
             let response=(await this.common.GetCategories()).data        
             this.productList=response.data;
            Notiflix.Loading.remove()
          } catch (error:any) {
            Notiflix.Loading.remove()
            Notiflix.Notify.failure(error.response.data.message)
          }
        }
    
      EditProduct(id:any){
        this.router.navigate(['/product',id])
      }
    
      async DeleteProduct(id:any){
        Notiflix.Loading.circle()
        try {
          let response=(await this.common.DeleteProduct(id)).data
          Notiflix.Notify.success(`response.message`)
          Notiflix.Loading.remove()
    
        } catch (error:any) {
          Notiflix.Loading.remove()
          Notiflix.Notify.failure(error.response.data.message)
        }
      }
    
      AddProduct(){
        this.router.navigate(['product/0'])
      }
}
