import express  from "express";
const router = express.Router();

import FoodController from "../controllers/FoodController";


router.route("/").get( FoodController.getFoods).post( FoodController.createFood );

router.route("/:id").get(FoodController.getFood ).put( FoodController.updateFood).delete( FoodController.deleteFood)

router.route("/category/:category_id").get(FoodController.getFoodsByCategory )

export default router;