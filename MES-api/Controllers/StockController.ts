import { Request, Response } from "express";
import { StockService } from "../Services/StockService";

export class StockController {
  private _stockService: StockService;
  constructor(private categoryService: StockService) {
    this._stockService = categoryService;
  }


}

const stockService = new StockService();
const stockController = new StockController(stockService);
export { stockController };
