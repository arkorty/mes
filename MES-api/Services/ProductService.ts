import { Product } from "../Models/Product";
import { ProductVariation } from "../Models/ProductVariation";
import { ProductImage } from "../Models/ProductImage";
import { DeleteImageFromS3, UpdateImageInS3, UploadProductFileToS3 } from "../Config/AwsS3Config";
import { IStockDto } from "../Models/Dto/IStockDto";
import { StockService } from "./StockService";

interface IProductService{
  DeleteProduct(id:string): Promise<Boolean>;
  GetProductById(id:string): Promise<any>;
  GetSimilarProducts(id:string): Promise<any>;
  GetProductList(search: string, category: string, currentPage: number, limit: number): Promise<any>;
  UpsertProduct(productObj: any,productFiles: {[fieldname: string]: Express.Multer.File[]}): Promise<any>;
}

export class ProductService implements IProductService{
  
  private _stockService: StockService;
  constructor(private stockService: StockService ) {
    this._stockService = stockService;    
  }

  public async GetProductList(search: string, category: string, currentPage: number, limit: number): Promise<any> {
    try {
        const query: any = {};
        
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        
        if (category) {
            query.categoryId = category; // Assuming categoryId is the field in Product model
        }

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip((currentPage - 1) * limit)
            .limit(limit);



        return {
            total: totalProducts,
            products: products
        };
    } catch (error: any) {
        throw new Error(error);
    }
  }

  public async DeleteProduct(id:string): Promise<Boolean> {
    try {
         if(id){
             let product = await Product.findById(id);
               if (product) {
                     let images = await ProductImage.find({ product: id });
                     //deleting product files
                     if (images) {
                       for (let idx = 0; idx < images.length; idx++) {
                         const element = images[idx];
                         if(element.image){
                          if (element.isCover)  await DeleteImageFromS3(element.image, true, element.thumbnail);                          
                          else await DeleteImageFromS3(element.image, false);
                         }
                         else return false;                    
                       }
                     }
                     let removedProduct = await Product.deleteOne({ _id: id });
                     if (removedProduct) return true;
                     return false;
                }
                else return false;
         }
         return false;
    } catch (error: any) {
      return false;
    }

  }

  public async GetProductById(id:string): Promise<any> {
    try {
      let otherImageList: { id: any; image: string }[] = [];
      let product: any;
      if(id){
        let productObj = await Product.findById(id);
        if (!productObj) return null;

        let response = await Promise.all([
          await ProductImage.find({ productId: id }),
          await ProductVariation.find({ product: id }),
          await this.GetSimilarProducts(id)
        ]);
        
        let images = response[0];
        let variations = response[1];
        let similarProducts = response[2];
  
        if (images.length > 0) {
          let coverImage = images.filter(
            (image: any) => image.isCover == true
          )[0];
          let otherImages = images;
  
          if (otherImages.length > 0) {
            otherImages.map((image: any) => {
              otherImageList.push({
                id: image._id,
                image: image.imageUrl,
              });
            });
          }
  
          product = {
            ...productObj,
            coverImage:
              images && coverImage
                ? { id: coverImage._id, image: coverImage.imageUrl }
                : { image: null },
            otherImages: otherImageList.length > 0 ? otherImageList : [],
            variations: variations.length > 0 ? variations : [],
            similarProducts: similarProducts.length > 0 ? similarProducts : [],
          };

          return product;
        }
      }
      else return null;
    }
      catch (error: any) {

      }
  }

  public async GetSimilarProducts(id:string): Promise<any> {
    try {
      const product = await Product.findById(id);
      if (!product) return null;

      const similarProducts = await Product.find({
        _id: { $ne: id }, // Exclude the current product
        $or: [
            { categoryId: product.categoryId },
            { name: { $in: product.name } }
        ],
        isActive: true
    }).limit(4);

    return similarProducts;
    }
     catch (error: any) {
        return null;
     }
  
  }

  public async UpsertProduct(productObj: any,productFiles: {[fieldname: string]: Express.Multer.File[]}): Promise<any> {
    try {
      let productId: any;
      let isUpdate: boolean = false;
      let product:any;
      const files = productFiles;
      let coverImage = files.coverImage ? files.coverImage[0] : null;
      let otherImages = files.otherImages || null;
      let { variations } = productObj;
      let parentProductCategoryId;

      //defining categoryDepth of product
      let categoryDepth:number = 0;
      if (productObj.categoryId){
        categoryDepth = 1;
        parentProductCategoryId=productObj.categoryId;
      }
      if (productObj.subCategoryId){
        categoryDepth = 2;
        parentProductCategoryId=productObj.subCategoryId;
      }
      if (productObj.subSubCategoryId){
        categoryDepth = 3;
        parentProductCategoryId=productObj.subSubCategoryId;
      }

      if (productObj._id) {
            productId = productObj._id;
            isUpdate = true;

            let productModel = await Product.findByIdAndUpdate(productObj._id, {
              $set: {
                name: productObj.name,
                slug: productObj.slug,
                brand: productObj.brand,
                categoryId: productObj.categoryId,
                subCategoryId: productObj.subCategoryId,
                subSubCategoryId: productObj.subSubCategoryId,
                description: productObj.description,
                price: productObj.price,
                shortDescription: productObj.shortDescription,
                salePrice: productObj.salePrice,
                stock: productObj.stock,
                parentProductCategoryId:parentProductCategoryId,
                productCategoryDepth: categoryDepth,
                modifiedOn: new Date(),
              },
            });
            product=productModel;

            //update product variations stock
            if(variations){
              for (let index = 0; index < variations.length; index++) {
                let productItem = variations[index];
                const model:IStockDto={
                  productId:productId,
                  productVariationId:productItem._id,
                  quantity:productItem.quantity
                }
                await this._stockService.UpdateStock(model);
              }
            }
      } 
      else {
            //add product
            let prodModel = await Product.create({
              name: productObj.name,
              slug: productObj.slug,
              brand: productObj.brand,
              categoryId: productObj.categoryId,
              subCategoryId: productObj.subCategoryId,
              subSubCategoryId: productObj.subSubCategoryId,
              description: productObj.description,
              price: productObj.price,
              shortDescription: productObj.shortDescription,
              salePrice: productObj.salePrice,
              parentProductCategoryId:parentProductCategoryId,
              productCategoryDepth: categoryDepth,
              modifiedOn: new Date(),
            });
            productId = prodModel._id;
            product=prodModel;

            //add product variations
            if (variations) {
              for (let index = 0; index < variations.length; index++) {
                let productItem = variations[index];
                //generate sku for element
                let generatedSku = await this.GenerateSKUForProductVariation(
                  productObj.name,
                  productItem.color,
                  productItem.size
                );
                productItem = {
                  ...productItem,
                  product: productId,
                  sku: generatedSku,
                };      
                let addVariation = await ProductVariation.create(productItem);
                //add prod variation stock
                const model:IStockDto={
                  productId:productId,
                  productVariationId:addVariation._id as string,
                  quantity:productItem.quantity
                }
                await this._stockService.AddSingleStock(model);

              }

              
            }
      }

        //handle files
          if (productFiles) {
            //update product images
            if (isUpdate) {
              if (coverImage) {
                let coverFile = await ProductImage.findOne({
                  isCover: true,
                  product: productId,
                });
                if (coverFile && coverFile.image) {
                  await UpdateImageInS3(
                    coverImage,
                    coverFile.image,
                    true,
                    coverFile.thumbnail
                  );
                }
              }
              //handle other images update
              if (otherImages) {
                let otherFiles = await ProductImage.find({
                  isCover: false,
                  product: productId,
                });
                for (let idx = 0; idx < otherImages.length; idx++) {
                  const element = otherImages[idx];
                }
              }
            } else {
              //add product images
              if (coverImage) {
                const { image, thumbnail, imageUrl, thumbnailUrl } =
                await UploadProductFileToS3(productId, coverImage, true);
                await ProductImage.create({
                  product: productId,
                  image,
                  thumbnail,
                  imageUrl,
                  thumbnailUrl,
                  isCover: true,
                });
              }
      
              if (otherImages) {
                for (let index = 0; index < otherImages.length; index++) {
                  const currentFile = otherImages[index];
                  const { image, thumbnail, imageUrl, thumbnailUrl } =
                  await UploadProductFileToS3(productId, currentFile, false);
                  await ProductImage.create({
                    product: productId,
                    image,
                    thumbnail,
                    imageUrl,
                    thumbnailUrl,
                    isCover: false,
                  });
                }
              }
            }
          }
      
      return product;
    } catch (error:any) {
      return null;
    }
  }

  private async GenerateSKUForProductVariation(productName:string,color?:string,size?:string){
    try{
      const baseSKU = productName.replace(" ","-").replace(/\s+/g, '-').toUpperCase();
      const attributes: string[] = [];
      if(size) attributes.push(`SIZE-${size}`)
      if(color) attributes.push(`COLOR-${color}`)
      return `${baseSKU}-${attributes.join('-')}`;
    }
    catch(error:any){
      throw error;
    }
  }


}
