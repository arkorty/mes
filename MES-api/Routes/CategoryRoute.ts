import express from 'express';
const categoryRouter=express.Router();
import { categoryController} from '../Controllers/CategoryController';
import { upload } from '../Config/FileStorageConfig';


categoryRouter.post(`/upsert`,upload.fields([{name:`picture`,maxCount:1}]),
(req,res)=>categoryController.UpsertCategory(req,res))
categoryRouter.get('/',(req,res)=>categoryController.GetCategoryTree(req,res))
categoryRouter.get('/dropdown',(req,res)=>categoryController.CategoryDropdown(req,res))

categoryRouter.get('/:id',(req,res)=>categoryController.CategoryDetails(req,res))
.delete('/:id',(req,res)=>categoryController.DeleteCategory(req,res))
//categoryRouter.get('',(req,res)=>categoryController.GetAllCategories(req,res))



export default categoryRouter
