import { ProductImage } from "../Models/ProductImage";
import { baseUrl, FilePaths, OrderStatus } from "../Common/Common";
import { Order } from "../Models/Order";
import { ProductVariation } from "../Models/ProductVariation";
import { ProductService } from "./ProductService";
import { Product } from "../Models/Product";
import { User } from "../Models/User";

interface IOrderService {
  CalculateOrderSummary(cartItems: any[], payload?: any): Promise<any>;
  CancelOrder(orderId: string): Promise<boolean>;
  CreateOrder(data: any): Promise<any>;
  GetOrderDetails(orderId: string): Promise<any>;
  GetUserOrders(userId: string, currentPage: number): Promise<any>;
  GetOrderList(
    search: string,
    currentPage: number,
    limit: number
  ): Promise<any>;
}

export class OrderService implements IOrderService {
  private _productService: ProductService;
  constructor(private productService: ProductService) {
    this._productService = productService;
  }
  public async CalculateOrderSummary(
    cartItems: any[],
    payload?: any
  ): Promise<any> {
    try {
      let OrderSummary = await Promise.all([
        await this.CalculateSubTotal(cartItems),
        await this.CalculateTax(cartItems),
        await this.CalculateShipping(cartItems),
      ]);
      console.log(OrderSummary);
      if (OrderSummary) {
        return {
          subTotal: OrderSummary?.[0] ?? 0,
          tax: OrderSummary?.[1] ?? 0,
          shipping: OrderSummary?.[2] ?? 0,
        };
      }
    } catch (error: any) {
      return null;
    }
  }

  public async CancelOrder(orderId: string): Promise<boolean> {
    try {
      let order = await Order.findById(orderId);
      if (order) {
        if (order.status == OrderStatus.Cancelled) return false;
        order.status = OrderStatus.Cancelled;
        await order.save();
        return true;
      } else return false;
    } catch (error: any) {
      return false;
    }
  }

  public async CreateOrder(data: any): Promise<any> {
    try {
     //check prod stock
     
      //calculate order summary
      let orderSummary = await this.CalculateOrderSummary(data.items, data);
      let shippingCost = orderSummary?.shipping ?? 0;
      let taxCost = orderSummary?.tax ?? 0;
      let subTotal = orderSummary?.subTotal ?? 0;

      let model = await Order.create({
        total: shippingCost + taxCost + subTotal,
        subTotal: subTotal,
        deliveryCharges: shippingCost,
        items: data.items,
        userId: data.userId,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
      });

      return { success: true, data: model._id };
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  }

  public async GetOrderDetails(orderId: string) {
    try {
      let itemResult: any[] = [];
      let orderObj = await Order.findById(orderId);

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
          name: product?.name || "",
          productVariationId: item.productVariationId,
          variationName: variation.size,
          quantity: item.quantity,
          price: item.quantity * variation.price,
          picture: coverFilePath,
        });
      }

      let user = await User.findById(orderObj.userId);
      orderObj = {
        ...orderObj._doc,
        items: itemResult,
        user,
      };
      return orderObj;
    } catch (error: any) {
      return null;
    }
  }

  public async GetUserOrders(userId: string, currentPage: number) {
      const limit: number = 5;
    try {
      let userOrders = await Order.find({ userId: userId })
      .populate("items.productId")
      .populate("items.productVariationId")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(5);

      if (userOrders) return userOrders;
      return null;
    } catch (error: any) {
      return null;
    }
  }

  public async GetOrderList(
    search: string,
    currentPage: number,
    limit: number
  ): Promise<any> {
    try {
      let query = {};
      if (search) {
        query = { ...query, name: { $regex: search, $options: "i" } };
      }
      let orders = await Order.find(query)
        .populate("items.productId")
        .sort({ createdOn: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit);
      return {data:orders,total:orders.length};
    } catch (error: any) {
      return null;
    }
  }


  //private methods
  private async CalculateSubTotal(cartItems: any[]): Promise<any> {
    let total: number = 0;
    try {
      if (cartItems.length > 0) {
        for (let item of cartItems) {
          let currentStock = await ProductVariation.findById(
            item.productVariationId
          );
          if (currentStock) {
            total += currentStock.retailPrice * item.quantity;
          }
        }
      }
      return total;
    } catch (error: any) {
      return null;
    }
  }

  private async CalculateShipping(cartItems: any[]) {
    let shipping = 0;
    return shipping;
  }
  private async CalculateTax(cartItems: any[]) {
    let shipping = 0;
    return shipping;
  }
}
