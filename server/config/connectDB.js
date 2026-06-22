import mongoose from "mongoose";

const connectDB = async () => {
    if(process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected") 
    } catch (error) {
        console.error("Database error: ",error.message);
        throw error;
    }
}

export default connectDB;