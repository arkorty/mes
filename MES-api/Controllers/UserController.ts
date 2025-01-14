
import { User } from "../Models/User";
import { Request,Response,NextFunction } from "express"
import { EncodeBase64,DecodeBase64, UserRole } from "../Common/Common";





let UserList=async(req:Request, res:Response)=>{
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ? String(req.query.search) : "";
    const currentPage = Number(req.query.page) || 1;
    try {
        let users=await User.find({ name: { $regex: search, $options: "i" }})
        .sort({ createdOn: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit);

        if(!users) return res.status(400).json({success:false,data:[]})
         let totalCount=await User.find({}).countDocuments()   

        res.status(200).json({
            success: true,
            totalCount: totalCount,
            data: users,
            currentPage: currentPage,
        })   
        
    } catch (err:any) {
        res.status(500).json({success:false,message:err.message})
    }
}

let DeleteUser=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let user=await User.findById(id)
            if(user){

                let removedUser=await User.deleteOne({_id:id});
                if(removedUser){
                    return res.status(200).json({
                        success:true,
                        message:`User Delete successfully`
                    })
                }

            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`User not found`
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

let UserDetails=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let user=await User.findById(id)
            if(user){
                return res.status(200).json({
                    success:true,
                    data:user
                })
            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`User not found`
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
        
    }
}


export {UserList,DeleteUser,UserDetails}