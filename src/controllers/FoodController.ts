import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response } from "express";
import Food, { IFoodModel } from "../model/Food";

//@desc Get all Foods
//@route GET /api/foods
//@access private
const getFoods = asyncHandler(async (req:Request, res: Response) => {
  const foods: IFoodModel[] = await Food.find();
  res.status(200).json(foods);
  });

  //@desc Get Foods based on Category
//@route GET /api/foods/category/:category_id
//@access private
const getFoodsByCategory = asyncHandler(async (req:Request, res: Response) => {
  const foods: IFoodModel[] = await Food.find({category_id: req.params.category_id});
  res.status(200).json({foods});
  });


//@desc Create new Food
//@route POST /api/foods
//@access private
const createFood = asyncHandler(async (req:Request, res: Response) => {
  const {title, price, serves, desc, category_id} = req.body;
  if(!title || !desc || !price || !serves ||!category_id) {
   res.status(400);
   throw new Error("All Fileds Are Mandatory!");
  }
  const foodToAdd: IFoodModel = new Food({
                                       title:req.body.title,
                                       price:req.body.price,
                                       serves:req.body.serves,
                                       desc:req.body.desc,
                                       category_id:req.body.category_id,
                                      });
   const food:IFoodModel = await Food.create(foodToAdd)
   res.status(200).json(food);
   });


//@desc Get Food
//@route GET /api/foods/:id
//@access private
const getFood = asyncHandler(async (req:Request, res: Response) => {
  const food: IFoodModel | null = await Food.findById(req.params.id);
  if(!food){
    res.status(404);
    throw new Error("Food Item Not Found!");
  }
    res.status(200).json(food);
    });

//@desc Update Food
//@route PUT /api/foods/:id
//@access private
const updateFood = asyncHandler(async (req:Request, res: Response) => {
  const food: IFoodModel | null = await Food.findById(req.params.id);
  if(!food){
    res.status(404);
    throw new Error("Food Item Not Found!");
  }
  const updatedFood = await Food.findByIdAndUpdate(
                                          req.params.id,
                                          req.body,
                                          {new: true}
                                        )
    res.status(200).json(updatedFood);
});

//@desc Delete Food
//@route DELETE /api/foods/:id
//@access private
const deleteFood = asyncHandler(async (req:Request, res: Response) => {
  const food: IFoodModel | null = await Food.findById(req.params.id);
  if(!food){
    res.status(404);
    throw new Error("Food Item Not Found!");
  }
    await Food.findByIdAndRemove(req.params.id);
    res.status(200).json({message:`Food item is deleted for ${req.params.id}`});
});

export default { 
    getFoods, 
    getFoodsByCategory,
    createFood, 
    getFood, 
    updateFood, 
    deleteFood};