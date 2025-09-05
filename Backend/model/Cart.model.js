import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema({
     productId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    name : {
        type :String
    },
    image : {
        type :String
    },
    price :{
        type :Number
    },
    size :{
        type :String
    },
    color :{
        type :String
    },
    quantity :{
        type :Number,
        default : 1
    }
    
},{
    _id : false
})
const cartSchema = mongoose.Schema({
    userid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true
    },
    guestId:{
        type :String
    },
    products :[CartItemSchema],
    totalPrice :{
        type :Number,
        required : true,
        default : 0
    }
},
{
    timestamps : true
})

const Cart = mongoose.model("cart",cartSchema)
export default Cart
