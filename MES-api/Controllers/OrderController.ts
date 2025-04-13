import { Request, Response, NextFunction } from "express";
import {OrderService} from "../Services/OrderService";
import {ProductService } from "../Services/ProductService";
import { StockService } from "../Services/StockService";


export class OrderController{
  private _orderService:OrderService;
  constructor(private orderService:OrderService){
    this._orderService=orderService;
  }

  public async CreateOrder(req: Request, res: Response) {
    try {
      let result=await this._orderService.CreateOrder(req.body);
      return res.status(200).json(result);
    } catch (error:any) {
      return res.status(500).json({message:error.message})
    }
  }

  public async GetOrderDetails(req: Request, res: Response) {
    const {id}=req.params;
    try{
      if(!id) return res.status(400).json({message:`Invalid payload`})
      let result=await this._orderService.GetOrderDetails(id);
      return res.status(200).json({success:true,data:result});
    } 
    catch (error:any) {
      return res.status(500).json({message:error.message})
    }
  }

  public async GetOrderSummary(req: Request, res: Response){
    try{
      const { cartItems } = req.body;
      const orderSummary = await this._orderService.CalculateOrderSummary(cartItems);
      if(orderSummary) return res.status(200).json({success:true,data:orderSummary})
      else return res.status(500).json({success:true,message:`Error while calculating order summary`});  
    }
    catch(error:any){
      return res.status(500).json({message:error.message})
    }
  }

  public async GetOrderList(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ? String(req.query.search) : "";
    const currentPage = Number(req.query.page) || 1;
    try{
      let result=await this._orderService.GetOrderList(search,currentPage,limit);
      if(result) return res.status(200).json({success:true,data:result});
      else return res.status(404).json({success:false,message:`No orders found`});

    }
    catch(error:any){
      return res.status(500).json({message:error})
    }
  }

  public async GetUserOrders(req: Request, res: Response){
    const {id}=req.params;
    const currentPage:number = Number(req.query.page) || 1;
    try{
      if(!id) return res.status(400).json({message:`Invalid payload`})
      let result=await this._orderService.GetUserOrders(id,currentPage);
      if(result) return res.status(200).json({success:true,data:result,page:currentPage});
      else return res.status(404).json({success:false,message:`No orders found`}); 
    }
    catch(error:any){
      return res.status(500).json({message:error})

    }
  }

  public async CancelOrder(req: Request, res: Response){
    const {id}=req.params;
    try{
      if(!id) return res.status(400).json({message:`Invalid payload`})
      let result=await this._orderService.CancelOrder(id);
      if(result) return res.status(200).json({success:true,message:`Order cancelled successfully`});
      else return res.status(500).json({success:false,message:`Error while cancelling order`}); 
    }
    catch(error:any){
      return res.status(500).json({message:error})
    }
  }

}

const stockService = new StockService();
const productService = new ProductService(stockService);
const orderService=new OrderService(productService);
const orderController=new OrderController(orderService);

export {orderController};



