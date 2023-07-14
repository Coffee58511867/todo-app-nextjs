import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGOURI as string);
        console.log("Connected");
    } catch (error) {
       console.log(error); 
    }
}

export default connectMongoDB;