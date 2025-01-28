import { Request, Response, NextFunction } from "express";
import { Order } from "../Models/Order";
import {
  baseUrl,
  FilePaths,
  OrderStatus,
  PaymentStatus,
} from "../Common/Common";
import { Product } from "../Models/Product";
import { CalculateOrderSummary } from "../Services/OrderService";
import { ProductVariation } from "../Models/ProductVariation";
import { ProductImage } from "../Models/ProductImage";
import { CartService } from "../Services/CartService";
import { User } from "../Models/User";
import { IsProductsAvailable } from "../Services/ProductService";
import { Payment } from "../Models/Payment";


const cartService = new CartService();

export function CalculateOrderTotalPrice(order: any) {
  order.subTotal = order.items.reduce(async (sum: number, element: any) => {
    let curProduct = await Product.findById(element.productId);
    if (curProduct) return sum + curProduct.price * element.quantity;
  }, 0);
  order.deliveryCharges = order.subTotal > 150 ? 0 : 4;
  order.total = order.subTotal + order.deliveryCharges;

  //write freezer box logic depending on volume of product and box
  return order.total;
}

let CreateOrder = async (req: Request, res: Response) => {
  if (!req.body.items)
    return res.status(400).json({ success: false, message: `Invalid payload` });

  //check if each selected product has stock
  let isAvailable = await IsProductsAvailable(req.body.items);
  if (!isAvailable)
    return res
      .status(400)
      .json({ success: false, message: `Stock unavailable` });

  //get subtotal, tax and shipping
  let orderSummary = await CalculateOrderSummary(req.body.items, req.body);
  let shippingCost = orderSummary?.shipping ?? 0;
  let taxCost = orderSummary?.tax ?? 0;
  let subTotal = orderSummary?.subTotal ?? 0;
  let boxPrice = req.body.boxPrice ?? 0;

  try {
    //create order
    let model = await Order.create({
      total: shippingCost + taxCost + subTotal,
      subTotal: subTotal,
      deliveryCharges: shippingCost,
      items: req.body.items,
      userId: req.body.userId,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      boxPrice : boxPrice
    });

    if (model.paymentMethod != "cash") {
      //handle card payment

      return res.status(200).json({
        success: true,
        data: {
          orderId: model._id,
          amount: taxCost + shippingCost + subTotal + boxPrice,
          currency: req.body.currency,
        },
      });
    }

    //payment via cash (COD)
    else {
      //update order status with payment status info
      console.log(model);
      let paymentObj = await Payment.create({
        orderId: model._id,
        userId: req.body.userId,
        amount: req.body.total,
        paymentMethod: "cash",
        paymentStatus: PaymentStatus.COD,
      });

      let order = await Order.findById(model._id);

      if (order) {
        order.status = OrderStatus.OrderReceived;
        order.paymentStatus = PaymentStatus.COD;
        await order.save();
      }

      //clear cart
      const result=await  cartService.ClearUserCart(req.body.userId);
      if(!result){
        return res.status(500).json({message:`Could not clear user cart`})
      }
      //ClearUserCart(req.body.userId);
      return res.status(200).json({
        success: true,
        message: `Order Created with Cash on delivery`,
        data: {
          orderId: order._id,
        },
      });
    }
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let GetAllOrders = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const currentPage = Number(req.query.page) || 1;
  try {
    //search, pagination, filter added later
    let orders = await Order.find({})
    .populate("items.productId")
    .sort({ createdOn: -1 })
    .skip((currentPage - 1) * limit)
    .limit(limit);;

    let totalProductCount=await Order.find({}).countDocuments()

    return res.status(200).json({ 
      success: true,
      data: orders,
      totalCount: totalProductCount,
      currentPage: currentPage,
     });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let GetUserOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  let orderList:any[]=[]
  try {
    
    
    let orders = await Order.find({ userId: id })
      .populate("items.productId")
      .populate("items.productVariationId")
      .sort({ createdAt: -1 })
      .limit(5);
    if (orders) {     
      for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
       
         let currentItems = order.items.map((item: any) => {
           return {
             id: item.productId._id,
             name: item.productId.name,
             productVariationId: item.productVariationId._id,
             variationName: item.productVariationId.size,
             quantity: item.quantity,
           };
         });
        // console.log(currentItems)
         for (
           let productIndex = 0;
           productIndex < currentItems.length;
           productIndex++
         ) {
           const product = currentItems[productIndex];

           let pictureAndVariationInfo = await Promise.all([
             await ProductImage.findOne({
               productId: product.id,
               isCover: true,
             }),
             await ProductVariation.findById(product.productVariationId),
           ]);

           //modify and add image in prods of a single order
           if (pictureAndVariationInfo) {
             const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${product.id}/thumbnail_${pictureAndVariationInfo[0].image}`;    
             product.picture=coverFilePath;
             product.price=pictureAndVariationInfo[1].retailPrice*product.quantity
           }
        
           orderList.push({
             id:order._id,
             shipping:order.shippingAddress,
             total:order.total,
             status:order.status,
             isPaid:order.isPaid,
             items:currentItems,
             boxPrice:order.boxPrice
           })


         }
      }
    }

    if (orderList) {
      return res.status(200).json({
        success: true,
        data: orderList,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let CancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order) {
      if (order.status === OrderStatus.Cancelled) {
        return res.status(400).json({
          success: false,
          message: "Order is cancelled ",
        });
      }
    }

    if (order.userId) {
      order.status = OrderStatus.Cancelled;
      await order.save();

      //if order cancel and payment via card or upi
      return res.status(200).json({
        success: true,
        message: `Order Cancelled`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Can't cancel someone else's order`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



let GetOrderSummary = async (req: Request, res: Response) => {
  const { cartItems } = req.body;
  try {
    if (!cartItems)
      return res
        .status(400)
        .json({ success: false, message: `Invalid  payload` });
    let orderSummary = await CalculateOrderSummary(cartItems);
    return res.status(200).json({
      success: true,
      data: orderSummary,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let GetSingleOrderDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  let itemResult: any[] = [];
  try {
    if (id) {
      let orderObj = await Order.findById(id);

      for (let index = 0; index < orderObj.items.length; index++) {
        const item = orderObj.items[index];
        //  console.log(item)
        let response = await Promise.all([
          await ProductVariation.findById(item.productVariationId),
          await ProductImage.findOne({
            productId: item.productId,
            isCover: true,
          }),
          await Product.findById(item.productId),
       
        ]);

        //  console.log(response)
        let variation = response[0];
        let cover = response[1];
        let product = response[2];
        const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${item.productId}/thumbnail_${cover.image}`;

        itemResult.push({
          id: item.productId,
          name: product?.name || '',
          productVariationId: item.productVariationId,
          variationName: variation.size,
          quantity: item.quantity,
          price: item.quantity * variation.price,
          picture: coverFilePath,
        });
      }
      let user=await User.findById(orderObj.userId)
      orderObj = {
        ...orderObj._doc,
        items: itemResult,
        user
      };
      if (orderObj) {
        return res.status(200).json({
          success: true,
          data: orderObj,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Order doesn't exist`,
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export {
  CreateOrder,
  GetAllOrders,
  GetUserOrders,
  CancelOrder,
  GetOrderSummary,
  GetSingleOrderDetails,
};
