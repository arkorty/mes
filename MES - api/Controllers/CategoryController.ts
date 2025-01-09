
import { Request,Response,NextFunction } from "express";
import { Category } from "../Models/Category";
import { UpdateImageInS3, UploadCategoryFileToS3 } from "../Config/AwsS3Config";


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
                    category.modifiedOn=Date.now()
                    await category.save()

                    if(picture){
                        await UpdateImageInS3(picture,category.image,false)
                    }
            }
        }
        else{

            if(!picture) return res.status(400).json({message:`Need picture`})

            const {image,imageUrl}=await UploadCategoryFileToS3(picture)
            //add 
            let model=await Category({
                name:req.body.name,
                description:req.body.description,
                image,
                imageUrl,
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
        // let categories=await Category.find({ name: { $regex: search, $options: "i" }})
        // .sort({ createdOn: -1 })
        // .skip((currentPage - 1) * limit)
        // .limit(limit);

        // let totalCategoryCount = await Category.find({}).countDocuments();
        const categories = await Category.find().populate('parentId');
        const categoryTree = BuildCategoryTree(categories);

        if(categories.length==0){
            return res.status(404).json({
                success:false,
                message:`No categories`
            })
        }

        return res.status(200).json({
            success:true,
            data:categoryTree,
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

function BuildCategoryTree(categories:any) {
    const map:any = {};
    const roots:any[] = [];

    categories.forEach((category:any) => {
        map[category._id] = { ...category._doc, children: [] }; // Add children array
    });

    categories.forEach((category:any) => {
        if (category.parentId) {
            map[category.parentId].children.push(map[category._id]);
        } else {
            roots.push(map[category._id]);
        }
    });

    return roots;
}

export {
    AddUpdateCategory,
    CategoryList,
    DeleteCategory,
    CategoryDetails,
    CategoryDropdown
}