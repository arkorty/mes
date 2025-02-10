import express from "express";
const orderRouter = express.Router();

import { orderController } from "../Controllers/OrderController";

orderRouter.put("/create", (req, res) => orderController.CreateOrder(req, res));
orderRouter.get("/summary", (req, res) =>
  orderController.GetOrderSummary(req, res)
);
orderRouter.get("/user/:id", (req, res) =>
  orderController.GetUserOrders(req, res)
);
orderRouter.get("cancel/:id", (req, res) =>
  orderController.CancelOrder(req, res)
);
orderRouter.get("/:id", (req, res) =>
  orderController.GetOrderDetails(req, res)
);
//.delete('/:id',(req,res)=>orderController.Del(req,res))
orderRouter.get("", (req, res) => orderController.GetOrderList(req, res));

export default orderRouter;
