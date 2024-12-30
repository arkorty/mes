import { ProductVariation } from "../Models/ProductVariation";

const CalculateOrderSummary=async(cartItems:any[],payload?:any)=>{

  try {
    let OrderSummary=await Promise.all([
      await CalculateSubTotal(cartItems),
      await CalculateTax(cartItems,payload),
      await CalculateShipping(cartItems),
    ])
    console.log(OrderSummary)
   if(OrderSummary){
    return {
      subTotal:OrderSummary?.[0] ?? 0,
      tax:OrderSummary?.[1] ?? 0,
      shipping:OrderSummary?.[2] ?? 0,
    }
   }

  } catch (error:any) {
    
  }
} 

const CalculateSubTotal=async(cartItems:any[])=>{
  let total=0;
  
  try {
    if(cartItems.length>0){
      for(let item of cartItems){
        let currentStock=await ProductVariation.findById(item.productVariationId)
        if(currentStock){
          total+=currentStock.retailPrice*item.quantity
        }
      }
    }
    console.log(total)
    return total;
  } catch (error:any) {
    
  }
}

const CalculateTax=async(cartItems:any[],payload:any)=>{
  let tax=0
  try {
    // const request={
    //   "apiLoginID": "YOUR_API_LOGIN_ID",
    //   "apiToken": "YOUR_API_TOKEN",
    //   "cartID": "YOUR_CART_ID",
    //   "customerID": payload.userId,
    //   "deliveredBySeller": true,
    //   "exemptionNo": "YOUR_EXEMPTION_NO",
    //   "items": cartItems,
    //   "origin": OriginAddress,
    //   "destination": payload.shippingAddress
    // }

    //get tax details from taxcloud api



    return tax;
  } catch (error:any) {
    
  }
}

const CalculateShipping=async(cartItems:any[])=>{
  let shipping=0;
  return shipping;
}


  export {
    CalculateOrderSummary
  }

