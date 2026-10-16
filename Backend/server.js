import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/Db_connection.js";
import userRoute from "./routes/UserRoute.js";
import productrouter from "./routes/ProductRouter.js";
import CartRoute from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import router from "./routes/UploadFileRouter.js";
import adminRouter from "./routes/AdminRouter.js";

const app = express();
// dotenv config
dotenv.config();

const port = process.env.PORT || process.env.PORT_NUM || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to clothify API");
});

// userRoute
app.use("/api/v1/user", userRoute);
// productRouter
app.use("/api/v1/product", productrouter);
// CartRoute
app.use("/api/v1/cart", CartRoute);
// orderRouter
app.use("/api/v1/order", orderRouter);
// upload Image Route
app.use("/api/v1/upload", router);
// admin Route
app.use("/api/v1/admin", adminRouter);

// mongoDbconnection & server start
connection()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("cannot connect to database:", err);
    app.listen(port, () => {
      console.log(`server is running on port ${port} (DB disconnected)`);
    });
  });
