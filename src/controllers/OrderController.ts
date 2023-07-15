import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response } from "express";
import Order, { IOrderModel } from "../model/Order";
import Restaurant, {IRestaurantModel} from "../model/Restaurant";

//@desc Get all Orders
//@route GET /api/orders
//@access private
const getOrders = asyncHandler(async (req:Request, res: Response) => {
  const orders: IOrderModel[] = await Order.find();
  res.status(200).json(orders);
  });

  //@desc Get Orders based on Customer Id
//@route GET /api/orders/:customerId
//@access private
const getOrdersByCustomer = asyncHandler(async (req, res) => {
  const orders = await Order.find({customer_id: req.params.customer_id});
  res.status(200).json({orders});
  });


//@desc Create new Order
//@route POST /api/orders
//@access private
const createOrder = asyncHandler(async (req:Request, res: Response) => {
  const {customer_id, restaurant_id, items, status, total, deliveryAddress} = req.body;
  if(!customer_id || !restaurant_id || !items || !status || !total || !deliveryAddress) {
   res.status(400);
   throw new Error("All Fileds Are Mandatory!");
  }
  const orderToAdd: IOrderModel = new Order({
                                       customer_id:req.body.customer_id,
                                       restaurant_id:req.body.restaurant_id,
                                       items:req.body.items,
                                       status:req.body.status,
                                       total:req.body.total,
                                       deliveryAddress:req.body.deliveryAddress,
                                      });
   const order:IOrderModel = await Order.create(orderToAdd)
   res.status(200).json(order);
   });


//@desc Get Order
//@route GET /api/orders/:id
//@access private
const getOrder = asyncHandler(async (req:Request, res: Response) => {
  const order: IOrderModel | null = await Order.findById(req.params.id);
  if(!order){
    res.status(404);
    throw new Error("Order Not Found!");
  }
  const restaurant: IRestaurantModel | null = await Restaurant.findById(order.restaurant_id);
  if(!restaurant){
    res.status(404);
    throw new Error("Restaurant Not Found!");
  }


    res.status(200).json({Restaurant: restaurant, Order: order});
 });

//@desc Update Order
//@route PUT /api/orders/:id
//@access private
const updateOrder = asyncHandler(async (req:Request, res: Response) => {
  const order: IOrderModel | null = await Order.findById(req.params.id);
  if(!order){
    res.status(404);
    throw new Error("Order Not Found!");
  }
  const updatedOrder = await Order.findByIdAndUpdate(
                                          req.params.id,
                                          req.body,
                                          {new: true}
                                        )
    res.status(200).json(updatedOrder);
});

//@desc Delete Order
//@route DELETE /api/orders/:id
//@access private
const deleteOrder = asyncHandler(async (req:Request, res: Response) => {
  const order: IOrderModel | null = await Order.findById(req.params.id);
  if(!order){
    res.status(404);
    throw new Error("Order Not Found!");
  }
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json({message:`Order item is deleted for ${req.params.id}`});
});

export default { 
    getOrders, 
    getOrdersByCustomer,
    createOrder, 
    getOrder, 
    updateOrder, 
    deleteOrder};