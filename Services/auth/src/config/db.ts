import mongoose from "mongoose";

const connectDB = async () =>{
    try {

        await mongoose.connect(process.env.MONGO_URI as string),{
            dbName : "FoodHub"
        }

        console.log("DB connect")

    } catch (error) {
        console.log("error ==>", error)
    }
}

export default connectDB