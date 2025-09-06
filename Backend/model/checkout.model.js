import mongoose from "mongoose";

const checkoutItemSchema = mongoose.Schema({
    productId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    name : {
        type : String,
        required:true
    },
    imaage :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    }
},{
    _id : false
})
const checkoutSchema = mongoose.Schema({
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref:"User" ,
       required : true
    },
    checkoutItem : [checkoutItemSchema],
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
    payMentDetail :{
        type : mongoose.Schema.Types.Mixed
    },
    isFinalized : {
        type :Boolean,
        default : false
    },
    finalizedAt :{
    type :Date
    }
},{timestamps : true})

const Checkout = mongoose.model("checkout",checkoutSchema);
export default Checkout;