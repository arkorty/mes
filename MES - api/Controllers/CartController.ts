import { Request,Response,NextFunction } from "express";
import { Product } from "../Models/Product";
import { Cart } from "../Models/Cart";
import { ProductVariation } from "../Models/ProductVariation";
import { ProductImage } from "../Models/ProductImage";
import { baseUrl } from "../Common/Common";
import { FilePaths } from "../Common/Common";


function CalculateCartTotalPrice(cart:any) {
    let totalPrice = 0;
    cart.items.forEach(async (product:any) => {
      let variation=await ProductVariation.findById(product.productVariationId)
      totalPrice += product.quantity * variation.price;
    });  
    cart.subTotal = totalPrice;
    cart.total=totalPrice;
}


let AddProductToCart = async (req:Request, res:Response) => {
    const { productId,productVariationId, quantity } = req.body;
    const {id:userId}=req.params
    try {

        //check if product exist
        let prod=await Product.findById(productId)
        if(!prod) {
            return res.status(400).json({
                success:false,
                message:'Product not found'
            })
        }
        //check if particular product variation has quantity left 
        let variation=await ProductVariation.findById(productVariationId);
        if(variation){
            if(variation.quantity < quantity) 
                return res.status(400).json({
                    success:false,
                    message:'Item not available'
            })
        }
        let cart = await Cart.findOne({
        userId: userId, 
        });

        if(cart){
             // Cart exists, check if the product is already in the cart
            const existingProduct = cart.items.find((product:any) => product.productId.equals(productId));
           
            if(existingProduct) existingProduct.quantity += quantity;
            else cart.items.push({ productId, productVariationId, quantity });

            await cart.save();
        }
        else{
            //cart does not exist so create new  
            cart = new Cart({ userId, items: [{ productId, productVariationId, quantity }] });
            CalculateCartTotalPrice(cart);
            await cart.save();
        }
        return res.status(200).json({ message: 'Product added to cart successfully',success:true });
   
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:`${err.message}`
        })
    }    

}

let RemoveProductFromCart=async (req:Request, res:Response) => {
    const {productId,userId}=req.params;

    // Check if the cart exists for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

     // Check if the product exists in the cart
     const productIndex = cart.items.findIndex((product:any) => product.productId.equals(productId));
     if (productIndex === -1) {
       return res.status(404).json({ message: 'Product not found in cart' });
     }

     // Remove the product from the cart
    cart.items.splice(productIndex, 1);
    CalculateCartTotalPrice(cart);
    await cart.save();
    //if discount
    // if (result.discount) {
    //   result.totalPriceAfterDiscount =
    //     result.totalPrice - (result.totalPrice * result.discount) / 100;
    // }
    return res.status(200).json({
        success:true,
        message:`Product removed from cart successfully`
    })
}

let UpdateProductQuantity=async(req:Request, res:Response)=>{   
    //send userid,quantity in req.body
    const {userId,quantity} = req.body;
    const {productId}=req.params;
    try {
        // Check if the cart exists for the user
        const cart = await Cart.findOne({ userId });
        if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const productIndex = cart.items.findIndex((product:any) => product.productId.equals(productId));
        if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the product quantity
        const currentProduct = cart.items[productIndex];
        currentProduct.quantity = quantity;

         // Check if the quantity is valid
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        // Check if the product is available in stock

        // const productDoc = await Product.findById(productId);
        // if (productDoc.stock < quantity) {
        // return res.status(400).json({ message: 'Product is out of stock' });
        // }
        CalculateCartTotalPrice(cart);
        await cart.save();
      
        let isCartExist = await Cart.findOne({ userId: req.body.userId });
      
        let item = isCartExist.items.find((elm:any) => elm.productId == req.params.id);
        if (item) {
          item.quantity = req.body.quantity;
        }
        CalculateCartTotalPrice(isCartExist);
      
        // if (isCartExist.discount) {
        //   isCartExist.totalPriceAfterDiscount =
        //     isCartExist.totalPrice -
        //     (isCartExist.totalPrice * isCartExist.discount) / 100;
        // }
       
      
       return res.status(200).json({ success:true,  message: 'Product quantity updated successfully' });
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let GetUserCartData=async(req:Request, res:Response)=>{
    const {id}=req.params; //userId
    try {

       if(id){
        let userCart=await Cart.findOne({userId:id}).populate('items.productId')
        .populate('items.productVariationId')
    //    
        if(userCart){
            let items=userCart.items.map((item:any) =>{
                return {
                 id:item.productId._id,
                 name:item.productId.name,
                 productVariationId:item.productVariationId._id,
                 variationName:item.productVariationId.size,
                 quantity:item.quantity,
                }
            })
     
            for (let index = 0; index < items.length; index++) {
                 const element = items[index];
                 let currentCoverPic=await ProductImage.findOne({
                     productId: element.id,
                     isCover: true,})
                     let variation=await ProductVariation.findById(element.productVariationId)    
                     console.log(currentCoverPic)
                     const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${element.id}/thumbnail_${currentCoverPic.image}`;    
                     element.picture=coverFilePath;
                     element.price=variation.retailPrice*element.quantity
     
            }
             
            return res.status(200).json({
                success:true,
                products: items,
                itemCount:userCart.items.length
            })
        }
        else{
            return res.status(404).json({ message: 'Cart not found',success:false });
        }
       }
       else return res.status(400).json({ message: 'Invalid request',success:false });

        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}




export {
    AddProductToCart,
    RemoveProductFromCart,
    UpdateProductQuantity,
    GetUserCartData,
    
}



