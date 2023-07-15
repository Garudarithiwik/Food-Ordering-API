import mongoose, {Document, Schema} from "mongoose";

// Define a TypeScript interface for your data model:
export interface IOrderModel extends Document {
   
    customer_id: String;
    restaurant_id: String; 
    items: [];
    status: string;
    total: Number;
    deliveryAddress: string;
}

const OrderSchema: Schema = new Schema(
    {
          customer_id:  { 
            type: mongoose.Schema.Types.ObjectId, 
            required:true,
            ref: 'Customer'
         },
         restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Restaurant'
          },

          items: [{
            food_id: {
              type: mongoose.Schema.Types.ObjectId,
              required:true,
              ref: 'Food'
            },
            name:{
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true,
              min: 1
            },
            price: {
              type: Number,
              required: true
            }
          }],

          status: {
            type: String,
            enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
            default: 'Pending'
          },
          total: {
            type: Number,
            required: true
          },
          deliveryAddress: {
            type: String,
            required: true
          },

    },
   
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IOrderModel>('Order', OrderSchema);