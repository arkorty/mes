import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { AppConstants } from '../../app.constant';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  localStorage: Storage | undefined;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initialize with default value
  isLoggedIn$!: Observable<boolean>;
  logoMaxSize = 50000; //50kb
  fileMaxLogo=50000*4; //200kb
  
  constructor() {
    this.isLoggedIn$=this.isLoggedInSubject.asObservable();
    this.setIsLoggedIn(this.IsLoggedIn()); // Use setIsLogge
   }

    //login region ----------------------------------------------------

  setIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }
  //check user login status
  IsLoggedIn(): boolean {
    if(localStorage.getItem('loggedAdminUser')){
      return true;
    }
    else return false;
  }

  SetLoggedUser(userObj:any){
    localStorage.setItem('loggedAdminUser',JSON.stringify(userObj))
  }


  LogOut(){
    localStorage.removeItem('loggedAdminUser')
    this.setIsLoggedIn(false);
  }

  Login(userObj:any){
    this.SetLoggedUser(userObj); //saving user in local storage
    this.setIsLoggedIn(true); //updating global state variable
  }

  //login region end ----------------

// ------------------------category apis ---------------------------------->
GetCategories(){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.category}`);
}

GetCategoryDetails(id:any){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.category}/${id}`);
}

UpsertCategory(data:any){
  return axios.post(`${AppConstants.baseUrl}${AppConstants.addUpdateCategory}`,data);
}

DeleteCategory(id:any){
  return axios.delete(`${AppConstants.baseUrl}${AppConstants.category}/${id}`);
}

CategoryDropdown(){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryDropdown}`);
}



}
