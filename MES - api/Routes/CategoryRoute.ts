import express from 'express';
const categoryRouter=express.Router();
import { AddUpdateCategory,
    CategoryList,
    DeleteCategory,
    CategoryDetails,CategoryDropdown} from '../Controllers/CategoryController';


categoryRouter.put(`/upsert`,AddUpdateCategory)
categoryRouter.get('/:id',CategoryDetails).delete('/:id',DeleteCategory)
categoryRouter.get('',CategoryList)
categoryRouter.get('/dropdown/list',CategoryDropdown)


export default categoryRouter
