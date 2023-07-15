import express  from "express";
const router = express.Router();

import RestaurantController from "../controllers/RestaurantController";


router.route("/").get( RestaurantController.getRestaurants).post( RestaurantController.createRestaurant );

router.route("/:id").get(RestaurantController.getRestaurant ).put( RestaurantController.updateRestaurant).delete( RestaurantController.deleteRestaurant)


export default router;