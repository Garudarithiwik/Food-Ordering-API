import { NextFunction,  Request, Response } from "express";
import asyncHandler from "express-async-handler"
import Customer, {ICustomerModel} from "../model/Customer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConfig } from "../config/dbConfig";

export interface IUserAuthInfoRequest extends Request {
    customer: ICustomerModel // or any other type
  }

//@desc Register a Customer
//@route POST    /api/customers/register
//@access public
const registerCustomer = asyncHandler(async  (req:IUserAuthInfoRequest, res:Response) => {
    const {username, email, password, address, phone} = req.body;
    if(!username || !email || !password || !address || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const existingCustomer = await Customer.findOne({email});
    if(existingCustomer) {
        res.status(400);
        throw new Error("You are already registered!");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const customer = await Customer.create({
        username,
        email,
        password: hashedPassword,
        address,
        phone,
    });
    if(customer) {
        res.status(200).json({_id: customer.id, email: customer.email})
    } else {
        res.status(400);
        throw new Error("Customer is not stored!");
    }
});





//@desc Login Customer
//@route POST   /api/customers/login
//@access public
const loginCustomer = asyncHandler(async  (req:IUserAuthInfoRequest, res:Response) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const customer = await Customer.findOne({email});
    if(customer && (await bcrypt.compare(password, customer.password))) {
        const accessToken = jwt.sign({
            customer: {    // payload
                username: customer.username,
                email: customer.email,
                id: customer._id,
               }, 
          }, dbConfig.access.token!,
             {expiresIn: "30m"}   
         );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Email / Password is not valid");
    }
});


//@desc Get Customer
//@route GET /api/customers/
//@access private
const getCustomer = asyncHandler(async (req:IUserAuthInfoRequest, res:Response) => {
    const customer = await Customer.findById(req.customer.id);
    if(!customer){
      res.status(404);
      throw new Error("Customer Not Found!");
    }
      res.status(200).json(customer);
      });

export default {registerCustomer, loginCustomer, getCustomer};