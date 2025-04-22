import {
  DeleteImageFromS3,
  UpdateImageInS3,
  UploadCategoryFileToS3,
} from "../Config/AwsS3Config";
import { Category } from "../Models/Category";
import {
  ISubSubCategory,
  ISubCategory,
  ICategory,
} from "../Models/Interface/ICategoryList";
import mongoose, { ObjectId } from "mongoose";
interface ICategoryService {
  GetAllCategories(
    search: string,
    currentPage: number,
    limit: number
  ): Promise<any>;
  GetCategoryById(id: string): Promise<any>;
  DeleteCategory(id: string): Promise<boolean>;
  UpsertCategory(
    categoryObj: any,
    categoryFiles: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<any>;
  GetCategoryFilterData(): Promise<any>;
  CategoryDropdownAdmin(): Promise<any>;
}

export class CategoryService implements ICategoryService {
  async GetAllCategories(
    search: string,
    currentPage: number,
    limit: number
  ): Promise<any> {
    try {
      const query: any = {};
      if (search) {
        query.name = { $regex: search, $options: "i" }; // Case-insensitive search
      }
      const totalCategories = await Category.countDocuments(query);
      const categories = await Category.find(query)
        .skip((currentPage - 1) * limit)
        .limit(limit);

      return {
        total: totalCategories,
        data: categories,
      };
    } catch (error: any) {
      return null;
    }
  }

  async GetCategoryById(id: string): Promise<any> {
    try {
      let category = await Category.findById(id);
      return category;
    } catch (error: any) {
      return null;
    }
  }

  async DeleteCategory(id: string): Promise<boolean> {
    try {
      const categoryIdsToDelete: string[] = [];

      const collectSubCategoryIds = async (categoryId: string) => {
        categoryIdsToDelete.push(categoryId);

        const children = await Category.find({ parentId: categoryId });

        for (const child of children) {
          await collectSubCategoryIds(child._id.toString());
        }
      };

      await collectSubCategoryIds(id);

      const categoriesToDelete = await Category.find({
        _id: { $in: categoryIdsToDelete },
      });

      for (const cat of categoriesToDelete) {
        if (cat.image) {
          await DeleteImageFromS3(cat.image, false);
        }
      }
      
      await Category.deleteMany({ _id: { $in: categoryIdsToDelete } });
      return true;
    } catch (error) {
      console.error("Error deleting categories:", error);
      return false;
    }
  }

  public async UpsertCategory(
    categoryObj: any,
    categoryFiles: { [fieldname: string]: Express.Multer.File[] }
  ) {
    try {
      let isUpdate: boolean = false;
      const files = categoryFiles;
      let categoryModel: any;
      let picture = files.picture ? files.picture[0] : null;
      if (categoryObj._id) {
        isUpdate = true;
        //update
        let category = await Category.findById(categoryObj._id);
        console.log(category);
        if (category) {
          (category.name = categoryObj.name),
            (category.description = categoryObj.description),
            (category.parentId = categoryObj.parentId
              ? categoryObj.parentId
              : null),
            (category.modifiedOn = new Date());
          await category.save();
          if (picture && category.image)
            await UpdateImageInS3(picture, category.image, false);
          categoryModel = category;
        }
      } else {
        if (!picture) return;

        const { image, imageUrl } = await UploadCategoryFileToS3(picture);
        //add
        let model = await Category.create({
          name: categoryObj.name,
          description: categoryObj.description,
          image,
          imageUrl,
          parentId: categoryObj.parentId ? categoryObj.parentId : null,
        });
        categoryModel = model;
      }

      return categoryModel;
    } catch (error: any) {
      return null;
    }
  }

  public async GetCategoryFilterData(): Promise<any> {
    let categoryList: ICategory[] = [];
    try {
      let categories = await Category.find({ parentId: null });
      if (categories) {
        for (let index = 0; index < categories.length; index++) {
          const element = categories[index];
          if (element) {
            //each category
            let categoryObj: ICategory = {
              _id: element._id,
              name: element.name,
              imageUrl: element.imageUrl ? element.imageUrl : null,
              parentId: null,
              subCategories: [],
              description: element.description ? element.description : "",
            };
            let subCategoryList: ISubCategory[] = [];
            let subCategories = await Category.find({ parentId: element._id });
            if (subCategories) {
              for (let index = 0; index < subCategories.length; index++) {
                const currentSubCategory = subCategories[index];
                if (currentSubCategory) {
                  //each sub category
                  let subCategoryObj: ISubCategory = {
                    _id: currentSubCategory._id,
                    name: currentSubCategory.name,
                    imageUrl: currentSubCategory.imageUrl
                      ? currentSubCategory.imageUrl
                      : null,
                    parentId: currentSubCategory.parentId
                      ? currentSubCategory.parentId
                      : null,
                    subSubCategories: [],
                    description: currentSubCategory.description
                      ? currentSubCategory.description
                      : "",
                  };

                  let subSubCategoryList: ISubSubCategory[] = [];
                  let subSubCategories = await Category.find({
                    parentId: currentSubCategory._id,
                  });
                  if (subSubCategories) {
                    for (
                      let index = 0;
                      index < subSubCategories.length;
                      index++
                    ) {
                      const subSubCategory = subSubCategories[index];
                      if (subSubCategory) {
                        //each sub sub category
                        const model: ISubSubCategory = {
                          _id: subSubCategory._id,
                          name: subSubCategory.name,
                          imageUrl: subSubCategory.imageUrl
                            ? subSubCategory.imageUrl
                            : null,
                          parentId: subSubCategory.parentId
                            ? subSubCategory.parentId
                            : null,
                          description: subSubCategory.description
                            ? subSubCategory.description
                            : "",
                        };
                        subSubCategoryList.push(model);
                      }
                    }
                    subCategoryObj.subSubCategories = subSubCategoryList;
                  }

                  subCategoryList.push(subCategoryObj);
                }
              }
              categoryObj.subCategories = subCategoryList;
            }
            categoryList.push(categoryObj);
          }
        }
        return {
          success: true,
          data: categoryList,
        };
      }
    } catch (error: any) {
      console.error("Error getting category filters data:", error);
      return null; // Return null in case of an error
    }
  }

  public async CategoryDropdownAdmin(): Promise<any> {
    let categoryList: ICategory[] = [];
    try {
      let categories = await Category.find({ parentId: null });
      if (categories) {
        for (let index = 0; index < categories.length; index++) {
          const category = categories[index];

          if (category) {
            const model: ICategory = {
              _id: category._id,
              name: category.name,
              imageUrl: category.imageUrl ? category.imageUrl : null,
              parentId: null,
              subCategories: [],
              description: category.description ? category.description : "",
            };
            categoryList.push(model);
            let subCategories = await Category.find({
              parentId: new mongoose.Types.ObjectId(category._id),
            });
            console.log(new mongoose.Types.ObjectId(category._id));
            if (subCategories) {
              for (
                let subIndex = 0;
                subIndex < subCategories.length;
                subIndex++
              ) {
                const subCategory = subCategories[subIndex];
                if (subCategory) {
                  const subModel: ICategory = {
                    _id: subCategory._id,
                    name: subCategory.name,
                    imageUrl: subCategory.imageUrl
                      ? subCategory.imageUrl
                      : null,
                    parentId: subCategory.parentId
                      ? subCategory.parentId
                      : null,
                    description: subCategory.description
                      ? subCategory.description
                      : "",
                    subCategories: [],
                  };
                  categoryList.push(subModel);
                }
              }
            }
          }
        }
      }
      return categoryList;
    } catch (error: any) {
      console.error("Error getting category dropdown data:", error);
      return null;
    }
  }
}
