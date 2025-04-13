import { Request, Response, NextFunction } from "express";
import { ProductService } from "../Services/ProductService";
import { StockService } from "../Services/StockService";

export class ProductController{
  private _productService:ProductService ;
  constructor(private productService:ProductService){
    this._productService=productService;
  }
  public async DeleteProduct(req: Request, res: Response){
    const { id } = req.params;
    try {
      if(id){
        const deletedProd=await this._productService.DeleteProduct(id);
        if(deletedProd) return res.status(200).json({success:true,message:`Product deleted successfully`});
        else return res.status(404).json({success:false,message:`Error while deleting product`});
      }
      else return res.status(400).json({success:false,message:`Invalid request`})
    } catch (error:any) {
      res.status(500).json({success:false,message:error});
    }
  }

  public async GetSimilarProducts(req: Request, res: Response){
    const {id}=req.params;
    try {
      if(!id) return res.status(400).json({success:false,message:`Invalid request`});
      const similarProducts=await this._productService.GetSimilarProducts(id);
      if(similarProducts) return res.status(200).json({success:true,data:similarProducts});
      else return res.status(404).json({success:false,message:`No similar products found`});      
    } catch (error:any) {
      res.status(404).json({success:false,message:error});
    }
  }

  public async ProductDetails(req: Request, res: Response){
    const {id}=req.params;
    try {
      if(!id) return res.status(400).json({success:false,message:`Invalid request`});
      const productDetails=await this._productService.GetProductById(id);
      if(productDetails) return res.status(200).json({success:true,data:productDetails});
      else return res.status(404).json({success:false,message:`Product not found`});
    } catch (error:any) {
      res.status(500).json({success:false,message:error});
    }
  }

  public async ProductList(req: Request, res: Response){
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ? String(req.query.search) : "";
    const currentPage = Number(req.query.page) || 1;
    const category = req.query.category ?? ``;
    try {
      const {total,products}=await this._productService.GetProductList(search,category as string,currentPage,limit);
      if(products) return res.status(200).json({success:true,data:products,totalCount:total,currentPage:currentPage});
      else return res.status(404).json({success:false,message:`No products found`});
    } catch (error:any) {
      res.status(500).json({success:false,message:error});
    }
  }

  public async UpsertProduct(req: Request, res: Response){      
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const product=await this._productService.UpsertProduct(req.body,files); //send incoming payload and files 
      if(product) return res.status(200).json({success:true,data:product});
      else return res.status(500).json({success:false,message:`Error while adding/updating product`});
    } catch (error:any) {
      res.status(500).json({success:false,message:error});
    }
  }

}
const stockService=new StockService();
const productService=new ProductService(stockService);
const productController=new ProductController(productService);

export { productController };
