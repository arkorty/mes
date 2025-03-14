export interface ICommonCategoryFields{
    _id:string | any,
    parentId:string | null,
    description:string,
    imageUrl:string | null,
    name:string,
}

export interface ICategory extends ICommonCategoryFields{
    subCategories:ISubCategory[]
}

export interface ISubCategory extends ICommonCategoryFields {
    subSubCategories:ISubSubCategory[]
}

export interface ISubSubCategory extends ICommonCategoryFields {

}

