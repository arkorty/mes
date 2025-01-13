import {  AddProductToCart,
    RemoveProductFromCart,
    UpdateProductQuantity,
    GetUserCartData} from '../Controllers/CartController'
import express from 'express';
const cartRouter=express.Router();


    //cartRouter.put(`/upsert`,AddUpdateBlog)
cartRouter.get('/:id',GetUserCartData) // id is userid
cartRouter.post('/add/:id',AddProductToCart)
cartRouter.get('/remove/:productId/:userId',RemoveProductFromCart)
cartRouter.post('/update/:productId',UpdateProductQuantity)

export default cartRouter