import mongoose from "mongoose";
import Product from "./model/product.model.js";
import User from "./model/user.model.js";
import products from "./data/product.js";
import dotenv from "dotenv"

dotenv.config();
// connect mongodb 
mongoose.connect(process.env.MONGODB_URL);

const seeding = async()=>{
    try {
        await Product.deleteMany()
        await User.deleteMany()
        // creating admin user

        const createdAdminUser = await User.create({
            name :"ram",
            email : "ram12@gmail.com",
            password : "123456",
            role : "admin"
        })
        const user = createdAdminUser._id;
        const simpleProduct = products.map((products)=>(
        {...products,user:user}
        ))
        await Product.insertMany(simpleProduct)
        console.log('====================================');
        console.log("product insert successfully");
        console.log('====================================');
        process.exit()
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        process.exit(1)
    
    }
}
seeding()