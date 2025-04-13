import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [FormsModule,CommonModule,    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
  isUpdate:boolean = false;
  categoryId:any;
  categoryObj: any={
     name:'',
     description:'',
     parentId:null,
     picture:'',
     imageUrl:``
  };
  files:any={}
  formSubmitted = false;
  categoryList:any[]=[]

  constructor(private router:Router,private common:CommonService,
    private activatedRoute:ActivatedRoute){
      this.GetCategoryDropdown();
      this.activatedRoute.params.subscribe((params) => {
        this.categoryId = params["id"];
        if (this.categoryId != "0") {
          this.isUpdate=true;
          this.GetCategoryDetails(this.categoryId);        
        } else {
          //console.log(this.specialisationId);
        }
      });
    }

    async GetCategoryDropdown(){
      Notiflix.Loading.circle()
      try {
        let response = (await this.common.CategoryDropdown()).data
        Notiflix.Loading.remove()
         if(response){
             this.categoryList=response.data;
         }
      } catch (error:any) {
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(error.response.data.message)
      }
    }

    async GetCategoryDetails(id:any){
      Notiflix.Loading.circle()
      try {
        let response = (await this.common.GetCategoryDetails(id)).data
        Notiflix.Loading.remove()
         if(response){
             this.categoryObj=response.data;
         }
      } catch (error:any) {
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(error.response.data.message)
      }
    }

    
    async OnFormSubmit() {
      this.formSubmitted = true;

      // Validate required cover image for new classes
      if (!this.isUpdate && !this.files['picture']) {
          Notiflix.Notify.failure('Cover image is required');
          return;
      }

      Notiflix.Loading.circle();
      try {
          const formData = new FormData();
          formData.append('name', this.categoryObj.name);
          formData.append('description', this.categoryObj.description);
          formData.append('picture', this.files['picture']);
          formData.append('parentId', this.categoryObj.parentId);
          if(this.isUpdate) formData.append('_id', this.categoryObj._id);
       

          let response = (await this.common.UpsertCategory(formData)).data;
          debugger
          Notiflix.Notify.success(response.message);
          Notiflix.Loading.remove();
          this.router.navigate(['/categories']);
      } catch (error: any) {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(error.response.data.message);
      }
    }

    onFileChange(event: Event, fieldName: string) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          this.files[fieldName] = input.files[0]; // Store the selected file
      }
    }

    UpdateParent(event:any){
      this.categoryObj.parentId=event.target.value
    }

}
