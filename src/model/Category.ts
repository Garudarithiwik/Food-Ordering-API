import mongoose,{Document,Schema} from "mongoose";
//Define a TypeScript interface for your data model:
export interface ICategoryModel extends Document{
    name:string;
}
const CategorySchema:Schema=new Schema(
    {
        name:{type:String,required:true}
    },
    {
        timestamps:true,
        versionKey:false,
    }
);
export default mongoose.model<ICategoryModel>('Category',CategorySchema);