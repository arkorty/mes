export const  AppConstants={
   // baseUrl:`http://localhost:3000/api`,   
    baseUrl:`http://localhost:5000/api`,   

    //users
    getAllUserList:`/user/all`,
    getUserDetails:`/user/`,
    addUpdateUser:`/user/`,
   // dropdownList:`/user/list/dropdown`,
    deleteUser:`/user/`,
    login:`/user/login`,

    //categories
    category:`/category`,
    addUpdateCategory:`/category/upsert`,
    categoryDropdown:`/category/dropdown/list`


}


export interface EventForm{
    eventName:String,
    userName:String,
    userCity:String,
    userMobile:String,
    userEmail:String,
    userCollege:String,
    pursueMba:string,
    budget:String,
    eventSource:String,
    eventCity:String,
}
export interface AddressObject{
    address:string,
    state:string,
    city:string,
    zipCode:string
    mobile:string
}

export enum UserRole{
    Admin=0,
    SuperAdmin=1,
    Client=2,
  }

export enum ProductCut{
    ribs="ribs",
    shanks="shanks",
    loin = "loin",
    shoulder="shoulder",
    rack="rack",
    ground="ground",
    boneless="boneless",
    stewMeat = "stewMeat"
}
  