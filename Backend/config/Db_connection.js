import mongoose from "mongoose";

const connection = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
         console.log("Db connected at:", connectionInstance.connection.host);
    } catch (error) {
        console.error("Error in connecting MongoDB:", error);
    }
}
export default connection