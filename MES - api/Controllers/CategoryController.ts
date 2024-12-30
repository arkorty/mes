
import { Request,Response,NextFunction } from "express";
import { Category } from "../Models/Category";


let AddUpdateCategory=async(req:Request, res:Response)=>{
    let isUpdate:boolean = false
    try {
        if(req.body._id){
            isUpdate=true;
            //update
            let categoryObj=await Category.findByIdAndUpdate(req.body._id,
                { $set: {
                    ...req.body,
                    modifiedOn:Date.now()
                } }
            );
        }
        else{
            //add 
            let model=await Category.create({
                name:req.body.name,
                description:req.body.description,
                picture:req.body.picture,
                parentId: (req.body.parentId) ? req.body.parentId:null
            })
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
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search) || "";
    const currentPage = Number(req.query.page) || 1;
    try {
        let categories=await Category.find({ name: { $regex: search, $options: "i" }})
        .sort({ createdOn: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit);

        let totalCategoryCount = await Category.find({}).countDocuments();

        if(categories.length==0){
            return res.status(404).json({
                success:false,
                message:`No categories`
            })
        }

        return res.status(200).json({
            success:true,
            data:categories,
            total:totalCategoryCount,
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
            if(category){

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
        let categories=await Category.find({})


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