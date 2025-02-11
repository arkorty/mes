import { cartController} from '../Controllers/CartController'
import express from 'express';
const cartRouter=express.Router();


    //cartRouter.put(`/upsert`,AddUpdateBlog)
cartRouter.get('/:id',(req,res)=>cartController.GetUserCart(req,res)) // id is userid
cartRouter.post('/add/:id',(req,res)=>cartController.AddItemToCart(req,res))
cartRouter.get('/remove/:productId/:userId',(req,res)=>cartController.RemoveItemFromCart(req,res))
cartRouter.post('/update/:userId',(req,res)=>cartController.UpdateItemInCart(req,res))

export default cartRouter