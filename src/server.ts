import express from 'express';
import {dbConfig} from './config/dbConfig'
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from "express";
import categoryRoutes from "./routes/categoryRoute";
import foodRoutes from "./routes/foodRoute";
import customerRoutes from "./routes/customerRoute";
import restaurantRoutes from "./routes/restaurantRoute";
import orderRoutes from "./routes/orderRoute";
import errorHandler from './middleware/ErrorHandler';
const app = express();

/** Connect to MongoDB */
mongoose.connect(dbConfig.mongo.url, {retryWrites:true, w:'majority'})
    .then( ()=> {
            console.log("MongoDB Connected");
        })
        .catch((error)=> {
            console.log(error);  
    })


// Defining a custom middleware function
const logger = (req:Request, res: Response, next:NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
 // Using/Loading the custom middleware function (logger) for all requests
app.use(logger);
// Using middlewares with 'app.use()'
app.use(express.json());  // Middleware for Body parsing

app.use("/api/categories", categoryRoutes); //middleware
app.use("/api/foods", foodRoutes); //middleware
app.use("/api/customers", customerRoutes); 
app.use("/api/restaurants", restaurantRoutes); 

app.use("/api/orders", orderRoutes);

app.use(errorHandler);

app.listen(dbConfig.server.port, () => {
    console.log(`Example app listening on port ${dbConfig.server.port}`)
  })
