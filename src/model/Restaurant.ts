import mongoose, {Document, Schema} from "mongoose";

// Define a TypeScript interface for your data model:
export interface IRestaurantModel extends Document {
    name: String;
    desc: String; 
    location: String; 
    menu: [];
}

const RestaurantSchema: Schema = new Schema(
    {
        name: {type:String, required: true},
        desc: {type:String, required: true},
        location: {type:String, required: true},
        
        menu: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
          }],
    },
   
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IRestaurantModel>('Restaurant', RestaurantSchema);