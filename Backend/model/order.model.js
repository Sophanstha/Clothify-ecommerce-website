import mongoose, { Types } from "mongoose";

const orderItemSchema = mongoose.Schema({
    productId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    name :{
        type :String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    size : {type : String},
    color : {type : String},
    quantity :{
        type : Number,
        required : true
    }
},{
    _id :false
})


const orderSchame = mongoose.Schema({
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref:"User" ,
       required : true
    },
    orderItem : [orderItemSchema],
    shippingAddress : {
        address : {type: String,required:true},
        city : {type: String,required:true},
        postalCode : {type: String,required:true},
        country : {type: String,required:true},
    },
    totalPrice : {
        type : Number,
        required : true
    },
    paymentMethod :{
        type : String,

    },
    isPaid : {
        type: Boolean,
        required : true
    },
    paidAt :{
        type :Date
    },
    paymentStatus :{
        type :String,
        default : "pending"
    },
    isDeliverd : {
        type : Boolean,
        default : false
    },
    deriverdAt :{
        type : Date
    },
    status :{
        type : String,
        default : "Processing",
        enum : ["Processing","Shipped","Delivered","Cancel"]
    }
   
   
},{timestamps : true})

const order = mongoose.model("orderSchema",orderSchame);
export default order;
