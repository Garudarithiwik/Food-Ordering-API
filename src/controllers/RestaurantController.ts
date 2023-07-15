import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"
import Restaurant, {IRestaurantModel} from "../model/Restaurant";


//@desc Get all Restaurants
//@route GET /api/restaurants
//@access private
const getRestaurants = asyncHandler(async (req:Request, res: Response) => {
  const restaurants: IRestaurantModel[]  = await Restaurant.find();
   res.status(200).json(restaurants);
  });


//@desc Create new Restaurant
//@route POST /api/restaurants
//@access private
const createRestaurant = asyncHandler(async (req:Request, res: Response) => {

  const {name, desc, location, menu} = req.body;
  if(!name || !desc || !location || !menu) {
   res.status(400);
   throw new Error("All Fileds Are Mandatory!");
  }

  const restaurantToAdd: IRestaurantModel = new Restaurant({
                    name:req.body.name,
                    desc:req.body.desc,
                    location:req.body.location,
                    menu:req.body.menu
                });
   const restaurant:IRestaurantModel = await Restaurant.create(restaurantToAdd)
   res.status(200).json(restaurant);
   });


//@desc Get Restaurant
//@route GET /api/restaurants/:id
//@access private
const getRestaurant = asyncHandler(async (req:Request, res: Response) => {
  const restaurant: IRestaurantModel | null = await Restaurant.findById(req.params.id);
  if(!restaurant){
    res.status(404);
    throw new Error("Restaurant Not Found!");
  }
    res.status(200).json(restaurant);
    });

//@desc Update Restaurant
//@route PUT /api/restaurants/:id
//@access private
const updateRestaurant = asyncHandler(async (req:Request, res: Response) => {
  const restaurant: IRestaurantModel | null = await Restaurant.findById(req.params.id);
  if(!restaurant){
    res.status(404);
    throw new Error("Restaurant Not Found!");
  }
  
  const restaurantToUpdate: IRestaurantModel =  req.body;
  const updatedRestaurant: IRestaurantModel | null = await Restaurant.findByIdAndUpdate(
                                          req.params.id,
                                          restaurantToUpdate,
                                          {new: true}
                                        )
    res.status(200).json(updatedRestaurant);
});

//@desc Delete Restaurant
//@route DELETE /api/restaurants/:id
//@access private
const deleteRestaurant = asyncHandler(async (req:Request, res: Response) => {
  const restaurant: IRestaurantModel | null = await Restaurant.findById(req.params.id);
  if(!restaurant){
    res.status(404);
    throw new Error("Restaurant Not Found!");
  }
    await Restaurant.findByIdAndRemove(req.params.id);
    res.status(200).json({message:`Restaurant is deleted for ${req.params.id}`});
});

export default{ getRestaurants, 
                createRestaurant, 
                getRestaurant, 
                updateRestaurant, 
                deleteRestaurant
            };