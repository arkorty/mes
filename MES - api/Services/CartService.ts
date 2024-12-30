import { Cart } from "../Models/Cart"

let ClearUserCart=async(userId:string)=>{
   try {
    let userCart=await Cart.findOne({userId:userId})
    if(userCart){
        let removeCart=await Cart.deleteOne({userId:userId})
        return true;
    }
   } catch (error:any) {
        return false;
   }
}
export {
    ClearUserCart 
}