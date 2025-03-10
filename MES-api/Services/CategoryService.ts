import { UpdateImageInS3, UploadCategoryFileToS3 } from '../Config/AwsS3Config';
import { Category } from '../Models/Category';

interface ICategoryService{
    GetAllCategories(search: string,currentPage: number, limit: number): Promise<any>;
    GetCategoryById(id: string): Promise<any>;
    DeleteCategory(id: string): Promise<boolean>;
    UpsertCategory(categoryObj: any,categoryFiles: {[fieldname: string]: Express.Multer.File[]}): Promise<any>;

}

export class CategoryService implements ICategoryService {

    async GetAllCategories(search: string,currentPage: number, limit: number): Promise<any> {
       try {
                const query: any = {};                 
                if (search) {
                    query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
                }
                 const totalCategories = await Category.countDocuments(query);
                 const categories = await Category.find(query)
                     .skip((currentPage - 1) * limit)
                     .limit(limit);

                     return {
                        total: totalCategories,
                        data: categories
                    };

       } catch (error:any) {
            return null;        
       }
    }

    async GetCategoryById(id: string): Promise<any> {
       try {
            let category = await Category.findById(id);
            return category;
       } catch (error:any) {
            return null;
       }
    }


    async DeleteCategory(id: string): Promise<boolean> {
       try {
          //  await Category.findByIdAndRemove(id);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async UpsertCategory(categoryObj: any,categoryFiles: {[fieldname: string]: Express.Multer.File[]}){
        try {
            let isUpdate:boolean=false;
            const files = categoryFiles;
            let categoryModel:any;
            let picture = files.coverImage ? files.picture[0] : null;        
            
                    if(categoryObj._id){
                        isUpdate=true;
                        //update
                        let category=await Category.findById(categoryObj._id);
                        if(category){
                                category.name=categoryObj.name,
                                category.description=categoryObj.description,
                                category.parentId= (categoryObj.parentId) ? categoryObj.parentId:null,
                                category.modifiedOn=new Date()
                                await category.save()            
                                if(picture && category.image) await UpdateImageInS3(picture,category.image,false)
                                categoryModel=category
                        }
                    }
                    else{
            
                        if(!picture) return ;
            
                        const {image,imageUrl}=await UploadCategoryFileToS3(picture)
                        //add 
                        let model=await Category.create({
                            name:categoryObj.name,
                            description:categoryObj.description,
                            image,
                            imageUrl,
                            parentId: (categoryObj.parentId) ? categoryObj.parentId:null
                        })
                        categoryModel=model

                    }
            
            return categoryModel;
        } catch (error:any) {
            return null;
        }
    }
}
