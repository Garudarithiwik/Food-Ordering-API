import mongoose, {Document, Schema} from "mongoose";

// Define a TypeScript interface for your data model:
export interface ICustomerModel extends Document {
    username: String;
    email: String;
    password: string;
    address: String;
    phone: String;
}

const CustomerSchema: Schema = new Schema(
    {
        username: {type:String, required: true},
        email: {type:String, required: true},
        password: {type:String, required: true},
        address: {type:String, required: true},
        phone: {type:String, required: true},
    },
   
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema);