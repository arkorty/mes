import { Request, Response } from "express";
import { WishList } from "../Models/WishList";
import catchAsync from "../utils/CatchAsync";

// Add to Wishlist
export const AddToWishlist = async (req: Request, res: Response) => {
    try {
      const { userId, productId, productVariationId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
      }
  
      if (!productId) {
        return res.status(400).json({ success: false, message: "productId is required" });
      }
  
      if (!productVariationId) {
        return res.status(400).json({ success: false, message: "productVariationId is required" });
      }
  
      const alreadyExists = await WishList.findOne({ userId, productId, productVariationId });
  
      if (alreadyExists) {
        return res.status(409).json({ success: false, message: "Product is already in wishlist" });
      }
  
      const data = await WishList.create({ userId, productId, productVariationId });
  
      return res.status(201).json({
        success: true,
        message: "Product added to wishlist successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Remove from Wishlist
  export const RemoveFromWishlist = async (req: Request, res: Response) => {
    try {
      const { userId, productId, productVariationId } = req.body;
  
      if (!userId || !productId || !productVariationId) {
        return res.status(400).json({ success: false, message: "userId, productId, and productVariationId are required" });
      }
  
      const result = await WishList.findOneAndDelete({ userId, productId, productVariationId });
  
      if (!result) {
        return res.status(404).json({ success: false, message: "Wishlist item not found" });
      }
  
      return res.status(200).json({ success: true, message: "Product removed from wishlist" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get Wishlist
  export const GetWishlist = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
      }
  
      const wishlist = await WishList.find({ userId }).populate("productId productVariationId");
  
      return res.status(200).json({ success: true, data: wishlist });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };