import { NextFunction,  Request, Response } from "express";
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import {ICustomerModel} from "../model/Customer";


export interface IUserAuthInfoRequest extends Request {
    customer: ICustomerModel // or any other type
  }

//Custom middleware for Authorization
const validateToken = asyncHandler( async (req:IUserAuthInfoRequest, res:Response, next:NextFunction) => {
    let token;
    let authHeader =  req.headers.authorization;
    // Token stars with "Bearer"
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:Error, decoded:any)=> {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.customer = decoded.customer;
            next();
        });

        if(!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
})

export default validateToken;