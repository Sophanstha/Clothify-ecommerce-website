import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connection from "./config/Db_connection.js";
import userRoute from "./routes/UserRoute.js";
import productrouter from "./routes/ProductRouter.js";
import CartRoute from "./routes/CartRoute.js";

const app = express();
// dotenv config 
dotenv.config()

const port = process.env.PORT_NUM 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.get("/",(req,res)=>{
  res.send("Welcome to clothify")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})

// userRoyte 
app.use("/api/v1/user",userRoute);
// productRouter
app.use("/api/v1/product",productrouter);
// CartRoute
app.use("/api/v1/cart",CartRoute)
// mongoDbconnection
connection().then(()=>{
    console.log("database connected succefully");
    
}).catch(()=>{
    console.log("cannot be connected");    
})

