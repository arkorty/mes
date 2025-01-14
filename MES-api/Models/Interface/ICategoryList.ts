export interface ICommonCategoryFields{
    _id:string,
    parentId:string,
    description:string,
    imageUrl:string,
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

