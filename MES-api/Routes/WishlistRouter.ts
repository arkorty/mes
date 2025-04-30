import express from "express";

const wishListRouter=express.Router();
import { AddToWishlist, GetWishlist, RemoveFromWishlist } from "../Controllers/WishListController";


wishListRouter.post('/add',AddToWishlist)
wishListRouter.get('/:userId',GetWishlist)
wishListRouter.post('/remove',RemoveFromWishlist)

export default wishListRouter