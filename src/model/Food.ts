import mongoose, {Document, Schema} from "mongoose";

// Define a TypeScript interface for your data model:
export interface IFoodModel extends Document {
    title: String;
    price: Number;
    serves: Number;
    desc: String;
    category_id: String;
}

const FoodSchema: Schema = new Schema(
    {
        title: {type:String, required: true},
        price: {type:Number, required: true},
        serves: {type:Number, required: true},
        desc: {type:String, required: true},
        category_id:  { type: mongoose.Schema.Types.ObjectId, 
                     required:true,
                     ref: 'Category'}
    },
   
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IFoodModel>('Food', FoodSchema);