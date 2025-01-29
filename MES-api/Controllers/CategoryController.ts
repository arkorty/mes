import { Request,Response,NextFunction } from "express";
import { Category } from "../Models/Category";
import { DeleteImageFromS3, UpdateImageInS3, UploadCategoryFileToS3 } from "../Config/AwsS3Config";
import {ICategory,ISubCategory,ISubSubCategory} from '../Models/Interface/ICategoryList';

let AddUpdateCategory=async(req:Request, res:Response)=>{
    let isUpdate:boolean = false
    let categoryData=req.body;
    try {
        
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        let picture = files.coverImage ? files.picture[0] : null;        

        if(req.body._id){
            isUpdate=true;
            //update
            let category=await Category.findById(req.body._id);
            if(category){
                    category.name=req.body.name,
                    category.description=req.body.description,
                    category.parentId= (req.body.parentId) ? req.body.parentId:null,
                    category.modifiedOn= new Date(),
                    await category.save()

                    if(picture && category.image){
                        await UpdateImageInS3(picture,category.image,false)
                    }
            }
        }
        else{

            if(!picture) return res.status(400).json({message:`Need picture`})

            const {image,imageUrl}=await UploadCategoryFileToS3(picture)
            //add 
            let model=new Category({
                name:req.body.name,
                description:req.body.description,
                image,
                imageUrl,
                parentId: (req.body.parentId) ? req.body.parentId:null
            })
            await model.save()
        }



     
        return res.status(200).json({
            success:true,
            message:`Category ${isUpdate ? "updated":"added"} successfully`
        })
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let CategoryList=async(req:Request, res:Response)=>{
    const currentPage = Number(req.query.page) || 1;
    const categoryList:ICategory[]=[]  
    try {
        // let totalCategoryCount = await Category.find({}).countDocuments();
        const categories = await Category.find({parentId:null})
        if(categories){
            for (let idx = 0; idx < categories.length; idx++) {
                //category loop
                const category = categories[idx];
                const categoryObj:ICategory={
                    _id:category._id.toString(),
                    name:category.name || '',
                    parentId:category.parentId?.toString() || '',
                    description:category.description || '',
                    imageUrl:category.imageUrl || '',
                    subCategories:[]
                };
                const subCategoryList:ISubCategory[]=[]

                //sub categories for single category
                let subCategories=await Category.find({parentId:category._id})
                if(subCategories){
                    for (let idx2 = 0; idx2 < subCategories.length; idx2++) {
                        const subCategory = subCategories[idx2];
                        const subCategoryObj:ISubCategory={
                            _id:subCategory._id.toString(),
                            name:subCategory.name || '',
                            parentId:subCategory.parentId?.toString() || '',
                            description:subCategory.description || '',
                            imageUrl:subCategory.imageUrl || '',
                            subSubCategories:[]
                        }
                        const subSubCategoryList:ISubSubCategory[]=[]

                        //get sub sub categories
                        let subSubCategories=await Category.find({parentId:subCategory._id})
                        if(subSubCategories){
                            for (let idx3 = 0; idx3 < subSubCategories.length; idx3++) {
                                const subSubCategory = subSubCategories[idx3];
                                const subSubCategoryObj:ISubSubCategory={
                                    _id:subSubCategory._id.toString(),
                                    name:subSubCategory.name || '',
                                    parentId:subSubCategory.parentId?.toString() || '',
                                    description:subSubCategory.description || '',
                                    imageUrl:subSubCategory.imageUrl || '',
                                }
                                subSubCategoryList.push(subSubCategoryObj)
                            }
                        }

                        subCategoryObj.subSubCategories=subSubCategoryList;                        
                        subCategoryList.push(subCategoryObj)
                    }
                }

                categoryObj.subCategories=subCategoryList;

                //add category to list
                categoryList.push(categoryObj)
            }
        }
        
        if(categories.length==0){
            return res.status(404).json({
                success:false,
                message:`No categories`
            })
        }

        return res.status(200).json({
            success:true,
            data:categoryList,
            page:currentPage
        })


        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let DeleteCategory=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let category=await Category.findById(id)
            if(category && category.image){
                await DeleteImageFromS3(category.image,false);
                let removedCategory=await Category.deleteOne({_id:id});
                if(removedCategory){
                    return res.status(200).json({
                        success:true,
                        message:`Category Delete successfully`
                    })
                }

            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`Category not found`
                })
            }

        }
        else{
            return res.status(400).json({
                success:false,
                message:`Id not found`
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let CategoryDetails=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let category=await Category.findById(id)
            if(category){
                return res.status(200).json({
                    success:true,
                    data:category
                })
            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`Category not found`
                })
            }
        }
        else{
            return res.status(500).json({
                success:false,
                message:`Provide Id`
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let CategoryDropdown=async(req:Request, res:Response)=>{
    try {
        let categories=await Category.find({}).select('id name')


        if(categories.length==0){
            return res.status(404).json({
                success:false,
                message:`No categories`
            })
        }

        return res.status(200).json({
            success:true,
            data:categories,
        })


        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export {
    AddUpdateCategory,
    CategoryList,
    DeleteCategory,
    CategoryDetails,
    CategoryDropdown
}