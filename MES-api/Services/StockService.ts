import { Product } from "../Models/Product";
import { Cart, ICart } from "../Models/Cart";
import { ProductVariation } from "../Models/ProductVariation";
import { baseUrl, FilePaths } from "../Common/Common";
import { ProductImage } from "../Models/ProductImage";
import { IStockDto } from "../Models/Dto/IStockDto";
import { StockMaster } from "../Models/StockMaster";

interface IStockService {
    AddSingleStock(stock: IStockDto): Promise<boolean>;
    UpdateStock(stock: IStockDto): Promise<boolean>;
    IsProductStockAvailable(productStock: IStockDto): Promise<boolean>;
    GetStockList(search: string, currentPage: number, limit: number): Promise<any>;
    DeleteStock(id: string): Promise<boolean>;
    ReduceProductStock(stock: IStockDto): Promise<boolean>;
}

export class StockService implements IStockService {
    public async AddSingleStock(stock: IStockDto): Promise<boolean> {
        try {
            const model:IStockDto = stock;
            const stockModel = new StockMaster(model);
            return true;
        }
        catch(err:any){
            console.error("Error adding stock:", err);
            return false;
        }
    }

    public async UpdateStock(stock: IStockDto): Promise<boolean> {
        try {
            const model:IStockDto = stock;
            let stockObj=await StockMaster.findOne({productVariationId:model.productVariationId});
            if(stockObj ){
                stockObj.quantity=model.quantity;
                stockObj.modifiedOn=new Date();
                stockObj.save();
                return true;
            }
            else return false;
            
        }
        catch(err:any){
            console.error("Error updating stock:", err);
            return false;
        }
    }

    public async IsProductStockAvailable(productStock: IStockDto): Promise<boolean> {
        try {
            const model:IStockDto = productStock;
            let stockObj=await StockMaster.findOne({productVariationId:model.productVariationId});
            if(stockObj && stockObj.quantity>=model.quantity){
                return true;
            }
            else return false;
        }
        catch(err:any){
            console.error("Error checking stock:", err);
            return false;
        }
    }

    public async GetStockList(search: string, currentPage: number, limit: number): Promise<any> {
        
        try {
            let stockList=await StockMaster.find({})
            .populate('productVariationId')
            .skip((currentPage-1)*limit)
            .limit(limit);

            return stockList;
        }
        catch(err:any){
            console.error("Error getting stock list:", err);
            return null;
        }
    }

    public async DeleteStock(id: string): Promise<boolean> {
        try {
            await StockMaster.findOneAndDelete({_id:id});
            return true;
        }
        catch(err:any){
            console.error("Error deleting stock:", err);
            return false;
        }
    }

    public async ReduceProductStock(stock: IStockDto): Promise<boolean> {
        try {
            const model:IStockDto = stock;
            let stockObj=await StockMaster.findOne({productVariationId:model.productVariationId});
            if(stockObj && stockObj.quantity>=model.quantity){
                stockObj.quantity-=model.quantity;
                stockObj.modifiedOn=new Date();
                stockObj.save();
                return true;
            }
            else return false;
        }
        catch(err:any){
            console.error("Error reducing stock:", err);
            return false;
        }
    }


}