import { Request, Response } from "express";
import { CategoryService } from "../Services/CategoryService";

export class CategoryController {
  private _categoryService: CategoryService;
  constructor(private categoryService: CategoryService) {
    this._categoryService = categoryService;
  }

  public async UpsertCategory(req: Request, res: Response) {
    let categoryData = req.body;
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      let picture = files.picture ? files.picture[0] : null;
      if (!categoryData._id && !picture)
        return res
          .status(400)
          .json({ success: false, message: `Image is required` });

      const categoryObj = await this._categoryService.UpsertCategory(
        categoryData,
        files
      );
      if (categoryObj)  return res.status(200).json({ success: true, message: `Category  successfully` });
      else res.status(500).json({ success: false, message: `Error while adding/updating category` });  
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async GetAllCategories(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ? String(req.query.search) : "";
    const currentPage = Number(req.query.page) || 1;
    try {
      const { total, data } = await this._categoryService.GetAllCategories(
        search as string,
        Number(currentPage),
        Number(limit)
      );
      if (data)
        return res
          .status(200)
          .json({
            success: true,
            data: data,
            totalCount: total,
            currentPage: currentPage,
          });
      else
        return res
          .status(404)
          .json({ success: false, message: `No categories found` });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async DeleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id)
        return res
          .status(404)
          .json({ success: false, message: `Invalid payload` });
      const deletedCategory = await this._categoryService.DeleteCategory(id);
      if (deletedCategory)
        return res
          .status(200)
          .json({ success: true, message: `Category deleted successfully` });
      else
        return res
          .status(404)
          .json({ success: false, message: `Error while deleting category` });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async CategoryDetails(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id)
        return res
          .status(404)
          .json({ success: false, message: `Invalid payload` });
      const categoryDetails = await this._categoryService.GetCategoryById(id);
      if (categoryDetails)
        return res.status(200).json({ success: true, data: categoryDetails });
      else
        return res
          .status(404)
          .json({ success: false, message: `Category not found` });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async GetCategoryTree(req: Request, res: Response) {
    try {
      const categoryTree = await this._categoryService.GetCategoryFilterData();
      if (categoryTree)
        return res.status(200).json({ success: true, data: categoryTree });
      else
        return res
          .status(404)
          .json({ success: false, message: `Category not found` });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async CategoryDropdown(req: Request, res: Response) {
    try {
      const categoryTree = await this._categoryService.CategoryDropdownAdmin();
      if (categoryTree)
        return res.status(200).json({ success: true, data: categoryTree });
      else
        return res
          .status(404)
          .json({ success: false, message: `Category not found` });
    }
    catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);
export { categoryController };
