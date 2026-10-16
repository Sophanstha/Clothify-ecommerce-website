import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices"
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productReducer,
        cart : cartReducer
    }
})

export default store;