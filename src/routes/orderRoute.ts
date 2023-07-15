import express  from "express";
import OrderController from "../controllers/OrderController";
import validateToken from "../middleware/ValidateTokenHandler";

const router = express.Router();


// Validate all order related requests using custom middleware 'validateToken'
router.use(validateToken);

router.route("/").get( OrderController.getOrders).post(OrderController.createOrder );

router.route("/:id").get(OrderController.getOrder ).put(OrderController.updateOrder).delete( OrderController.deleteOrder)

router.route("/customer/:customer_id").get(OrderController.getOrdersByCustomer )

export default router;