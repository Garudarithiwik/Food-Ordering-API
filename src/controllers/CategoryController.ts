import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"
import Category, {ICategoryModel} from "../model/Category";


//@desc Get all Categories
//@route GET /api/categories
//@access private
const getCategories = asyncHandler(async (req:Request, res: Response) => {
  const categories: ICategoryModel[]  = await Category.find();
   res.status(200).json(categories);
  });


//@desc Create new Category
//@route POST /api/categories
//@access private
const createCategory = asyncHandler(async (req:Request, res: Response) => {

   //Using typecasting to avoid typos and restrict the body variable to match ITodo
  const {name} = req.body;
  if(!name) {
   res.status(400);
   throw new Error("All Fileds Are Mandatory!");
  }

  const categoryToAdd: ICategoryModel = new Category({name:req.body.name});
   const category:ICategoryModel = await Category.create(categoryToAdd)
   res.status(200).json(category);
   });


//@desc Get Category
//@route GET /api/categories/:id
//@access private
const getCategory = asyncHandler(async (req:Request, res: Response) => {
  const category: ICategoryModel | null = await Category.findById(req.params.id);
  if(!category){
    res.status(404);
    throw new Error("Category Not Found!");
  }
    res.status(200).json(category);
    });

//@desc Update Category
//@route PUT /api/categories/:id
//@access private
const updateCategory = asyncHandler(async (req:Request, res: Response) => {
  const category: ICategoryModel | null = await Category.findById(req.params.id);
  if(!category){
    res.status(404);
    throw new Error("Category Not Found!");
  }
  
  const categoryToUpdate: ICategoryModel =  req.body;
  const updatedCategory: ICategoryModel | null = await Category.findByIdAndUpdate(
                                          req.params.id,
                                          categoryToUpdate,
                                          {new: true}
                                        )
    res.status(200).json(updatedCategory);
});

//@desc Delete Category
//@route DELETE /api/categories/:id
//@access private
const deleteCategory = asyncHandler(async (req:Request, res: Response) => {
  const category: ICategoryModel | null = await Category.findById(req.params.id);
  if(!category){
    res.status(404);
    throw new Error("Category Not Found!");
  }
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({message:`Category is deleted for ${req.params.id}`});
});

export default{ getCategories, 
                createCategory, 
                getCategory, 
                updateCategory, 
                deleteCategory
            };