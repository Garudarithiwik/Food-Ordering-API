import express  from "express";
const router = express.Router();

import CategoryController from "../controllers/CategoryController";


router.route("/").get( CategoryController.getCategories).post( CategoryController.createCategory );

router.route("/:id").get(CategoryController.getCategory ).put( CategoryController.updateCategory).delete( CategoryController.deleteCategory)


export default router;