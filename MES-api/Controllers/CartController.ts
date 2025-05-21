import { Request,Response,NextFunction } from "express";
import { CartService } from "../Services/CartService";
import { IProductCartDto } from "../Models/Dto/IProductCartDto";

export class CartController {
    private _cartService: CartService;
    constructor(private cartService: CartService) {
        this._cartService = cartService;
    }
    public async AddItemToCart(req:Request, res: Response){
        const {productId,productVariationId,quantity} = req.body;
        const {id}=req.params;
        try {
            if(!id ||
                !productId || 
                !productVariationId || 
                !quantity) return res.status(400).json({success:false,message:"Invalid request"});
                
            let productCartDto:IProductCartDto = {
                userId:id,
                productId:productId,
                productVariationId:productVariationId,
                quantity:quantity
            };
            let result = await this._cartService.AddProductToCart(productCartDto);
            if(result) res.status(200).json({success:true,message:"Product added to cart successfully"});
            else res.status(400).json({success:false,message:"Failed to add product to cart"});
        }   
        catch (error: any) {
            return res.status(500).json({message:error.message});
        }
    }
    public async RemoveItemFromCart(req:Request, res: Response){
        const {productId,userId}=req.params;
        try {
            if(!productId || !userId) return res.status(400).json({success:false,message:"Invalid request"});
            let result = await this._cartService.RemoveProductFromCart(productId,userId);
            if(result) return res.status(200).json({success:true,message:"Product removed from cart successfully"});
            else res.status(400).json({success:false,message:"Failed to remove product from cart"});
            
        } catch (error: any) {
            return res.status(500).json({success:false,message:error.message});
        }
    }

    public async UpdateItemInCart(req:Request, res: Response){
        const {productId,productVariationId,quantity} = req.body;
        const {userId}=req.params;
        try {
            let productCartDto:IProductCartDto = {
                userId:userId,
                productId:productId,
                productVariationId:productVariationId,
                quantity:quantity
            };
            let result = await this._cartService.UpdateProductFromCart(productCartDto);

            if(result) res.status(200).json({success:true,message:"Product updated in cart successfully"});
            else res.status(400).json({success:false,message:"Failed to update product in cart"});
        } catch (error: any) {
            return res.status(500).json({success:false,message:error.message});
        }
    }

    public async GetUserCart(req:Request, res: Response){
        const {id}=req.params;
        try {
            let result = await this._cartService.GetUserCart(id);
            if(result) res.status(200).json(result);
            else res.status(400).json({success:false,message:"Failed to get cart"});
        } catch (error: any) {
            return res.status(500).json({success:false,message:error.message});
        }
    }

    public async GetCartTotalPrice(req:Request, res: Response){
        const {id}=req.params;
        try {
            let result = await this._cartService.GetCartSummary(id);
            if(result) res.status(200).json(result);
            else res.status(400).json({success:false,message:"Failed to get cart summary"});
        } catch (error: any) {
            return res.status(500).json({success:false,message:error.message});
        }
    }

}

const cartService = new CartService();
const cartController = new CartController(cartService);
export {cartController};



