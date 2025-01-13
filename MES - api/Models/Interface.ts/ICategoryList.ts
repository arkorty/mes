interface ICommonCategoryFields{
    _id:string,
    parentId:string,
    description:string,
    imageUrl:string,
    name:string,
}

interface ICategory extends ICommonCategoryFields{
    subCategories:ISubCategory[]
}

interface ISubCategory extends ICommonCategoryFields {
    subSubCategories:ISubSubCategory[]
}

interface ISubSubCategory extends ICommonCategoryFields {

}

