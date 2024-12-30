import { ProductVariation } from "../Models/ProductVariation";

// generate sku for prod variation
const GenerateSKUForProduct=()=>{

}

let IsProductsAvailable = async (orderObj: any): Promise<Boolean> => {

    if (orderObj.length > 0) {
        for(let order of orderObj) {
          let currentProductStock = await ProductVariation.findById(
            order.productVariationId
          );
          if (currentProductStock.quantity < order.quantity) {
            return false;
          }
        }
        return true;
    }
    return true;
  };

  let UpdateProductStock = async(orderId:string,cartItems: any[]): Promise<Boolean> => {
    try {
      if(cartItems.length>0){
        for(let item of cartItems) {
          let stockUpdate=await Promise.all([await ProductVariation.findById(item.productVariationId),
          ])
          if(stockUpdate){
            let prodVariationData=stockUpdate[0];            
            prodVariationData.quantity-=item.quantity;
            prodVariationData.modifiedOn=Date.now();
  
            await Promise.all([
              await prodVariationData.save(),
            ])
          } else return false;
        }
        
      return true;
      }
      else return false;
    } catch (error: any) {
      return false;
    }
  };


  export {
    IsProductsAvailable,
    UpdateProductStock
  }
  