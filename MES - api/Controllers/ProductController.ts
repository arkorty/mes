import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";
import fs from "fs";
import path from "path";
import { baseUrl, FilePaths, GenerateThumbnail, rootDir } from "../Common/Common";
import { WriteFileToPath } from "../Config/FileStorageConfig";
import { ProductVariation } from "../Models/ProductVariation";
import { ProductImage } from "../Models/ProductImage";
//import { ServiceImage } from "../Models/ServiceImageModel";

let AddUpdateProduct = async (req: Request, res: Response) => {
  let productData = req.body;
  let isUpdate: boolean = false;
  let productId:any;
  let {variations}=req.body
  try {
    //getting all the files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let coverImage = files.coverImage ? files.coverImage[0] : null;
    let otherImages = files.images ? files.otherImages : null;

    if (productData._id) {
      productId = productData._id;
      isUpdate = true;

      let productModel = await Product.findByIdAndUpdate(req.body._id, {
        $set: {
          name: productData.name,
          slug: productData.slug,
          brand: productData.brand,
          categoryId:productData.categoryId,
          subCategoryId:productData.subCategoryId,
          subSubCategoryId:productData.subSubCategoryId,
          description: productData.description,
          price: productData.price,
          shortDescription:productData.shortDescription,
          salePrice:productData.salePrice,
          stock:productData.stock,
          modifiedOn: new Date(),
        },
      });

      //remove whole folder with product id
      if(req.files){
        let prevFiles = await ProductImage.findOne({
          product: productData._id,
        });
        if(prevFiles){
          let removeDir = path.join(
            `${rootDir}${FilePaths.productFilePath}`,
            `${productId}`
          );
          if (fs.existsSync(removeDir)) {
            await fs.promises.rm(removeDir, { recursive: true, force: true });
          }
        }
        //update db
      }
    }
    else {
      
      //add product
      let productObj=await Product.create({
        name: productData.name,
        slug: productData.slug,
        brand: productData.brand,
        categoryId:productData.categoryId,
        subCategoryId:productData.subCategoryId,
        subSubCategoryId:productData.subSubCategoryId,
        description: productData.description,
        price: productData.price,
        shortDescription:productData.shortDescription,
        salePrice:productData.salePrice,
        modifiedOn: new Date(),
      })
      productId=productObj._id

      //add product variations
      if(variations){
        for (let index = 0; index < variations.length; index++) {
          let productItem = variations[index];
          //generate sku for element
          let generatedSku:string='';
          productItem={
            ...productItem,
            product:productId,
            sku:generatedSku
          }
          
        let addVariation=await ProductVariation.create(productItem)
        //add item to stock
        }
      }
    }
    //handle files
    if(req.files){  
      const filename = coverImage?.originalname.replace(" ","_");
      const thumbnailFilename = `thumbnail_${filename}`;     
      const uploadFilePath = `${rootDir}${FilePaths.productFilePath}/${productId}/`;
      const thumbnailPath = `${rootDir}${FilePaths.productFilePath}/${productId}/${thumbnailFilename}`;
      const fileNamePath = `./${FilePaths.productFilePath}/${productId}/${filename}`;
      fs.mkdirSync(uploadFilePath, { recursive: true }); //make path if not already
   

      if(coverImage){
        //write file in path and save in db
        let productCover=await ProductImage.create({
          product:productId,
          isCover:true,
          image:coverImage.originalname
        })
        WriteFileToPath(uploadFilePath,coverImage)
        await GenerateThumbnail(fileNamePath, 200, thumbnailPath);
        //generate thumbnail
      }

      if(otherImages){
        for (let index = 0; index < otherImages.length; index++) {
          const element = otherImages[index];
          let productImage=await ProductImage.create({
            isCover:false,
            product:productId,
            image:element.originalname
          })
          WriteFileToPath(uploadFilePath,element)            
        }
      }

    }

    return res.status(200).json({
      success: true,
      message: `Service ${isUpdate ? "updated" : "added"} successfully`,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      let user = await Product.findById(id);
      if (user) {
        let removedProduct = await Product.deleteOne({ _id: id });
        if (removedProduct) {
          return res.status(200).json({
            success: true,
            message: `Service Delete successfully`,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: `Service not found`,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `Id not found`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let ProductList = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const search = String(req.query.search) || "";
  const currentPage = Number(req.query.page) || 1;
  const category =req.query.category || ``;

  let productList: any[] = [];
  try {
    let filter: any = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ],
    };

    // Add category filter if present
    if (category) {
      filter.category = { $eq: [category] };
    }

    let products = await Product.find(filter)
      .sort({ createdOn: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit);
    if (!products) return res.status(400).json({ success: false, data: [] });

    if(products.length>0){
      for (let index = 0; index < products.length; index++) {
        let element = products[index];
        
        let productData=await Promise.all([
          await ProductImage.findOne({ productId: element._id,isCover:true }),
          await ProductVariation.find({product:element._id}), 
        ])

        let coverPic=productData[0]
        let variations=productData[1]

        if (coverPic) {
          const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${element._id}/thumbnail_${coverPic.image}`;
       
          productList.push({
            ...element,
            coverImage: {
              image: coverFilePath,
              id: coverPic._id,
            },
            variations:(variations.length>0) ? variations:[]
          })

        } else {
          productList.push({
            ...element,
            coverImage: {
              image: null
            },
            variations:(variations.length>0) ? variations:[]
          });
        }





      }
    }



    let totalCount = await Product.find({}).countDocuments();

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      data: productList,
      currentPage: currentPage,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
let ProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  let product:any;
  let otherImageList: { id: any; image: string; }[]=[];
  try {
    if (id) {
      let productObj = await Product.findById(id);
      if (!productObj) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
      let response=await Promise.all([
        await ProductImage.find({ productId: id }),
        await ProductVariation.find({product:id}), 
      ])
      let images=response[0]
      let variations=response[1]

      if(images.length>0){
        let coverImage=images.filter((image:any)=> image.isCover==true)[0];
        let otherImages=images

        if(otherImages.length>0){
          otherImages.map((image:any)=>{
            otherImageList.push({
              id:image._id,
              image: `${baseUrl}${FilePaths.productFilePath}/${id}/${image.image}`
          })
          })
         
         }

         product={
          ...productObj,
          coverImage:(images && coverImage) ? {id:coverImage._id,image:`${baseUrl}${FilePaths.productFilePath}/${id}/${coverImage.image}`} : {image:null},
          otherImages:otherImageList.length>0? otherImageList:[],
          variations:(variations.length>0) ? variations:[],
        }
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Provide Id`,
      });
    }
  } catch (err: any) {}
};

export { AddUpdateProduct, DeleteProduct, ProductList, ProductDetails };
