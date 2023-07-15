import express  from "express";
import CustomerController from "../controllers/CustomerController";
import validateToken from "../middleware/ValidateTokenHandler"

const router = express.Router();

router.post("/register", CustomerController.registerCustomer)

router.post("/login", CustomerController.loginCustomer)

// Using custom middleware validateToken for Authorization
router.get("/",  validateToken, CustomerController.getCustomer)

export default router;