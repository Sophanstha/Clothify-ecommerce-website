import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",async({
        category,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        collection,
        material,
        brand,
        limit
    })=>{
        const queryParams = new URLSearchParams();
        if (category) queryParams.append("category", category);
        if (size) queryParams.append("size", size);
        if (color) queryParams.append("color", color);
        if(gender) queryParams.append("gender",gender);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (search) queryParams.append("search", search);
        if (collection) queryParams.append("collection", collection);
        if (material) queryParams.append("material", material);
        if (brand) queryParams.append("brand", brand);
        if (limit) queryParams.append("limit", limit);

        const responxe = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product?${queryParams.toString()}`);
        return responxe.data;
    }
)
// asyn thunk for fetching single product details by id
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",async(productId)=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/singleProduct/${productId}`);
        return response.data;
    })
// asyn thunk to update product details
export const updateProduct = createAsyncThunk(
    "products/updateProduct",async({productId,updatedData})=>{
        const token = localStorage.getItem("token");
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/product/Product/${productId}`,updatedData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)
// asyn thunk to  fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",async(productId)=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/similarProduct/${productId}`);
        return response.data;
    }
)

const productSlice = createSlice({
    name:"products",
    initialState:{
        products :[],
        selectProduct : null,
        similarProducts:[],
        loading : false,
        error : null,
        filter:{
            category: "",
            size: "",
            color: "",
            gender: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            collection: "",
            material: "",
            brand: "",
            limit: 20

        }
    },
    reducers:{
        setFilter : (state,action)=>{
            state.filter = {...state.filter,...action.payload}
        },
        clearFilter : (state)=>{
            state.filter = {
   category: "",
            size: "",
            color: "",
            gender: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            collection: "",
            material: "",
            brand: "",
            limit: 20
                
            }
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false;
            const items = action.payload?.data || action.payload;
            state.products = Array.isArray(items) ? items : [];
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // fetch single product by id
        .addCase(fetchProductById.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectProduct = action.payload?.data || action.payload;
        })
        .addCase(fetchProductById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // update product details
        .addCase(updateProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading = false;
            const updateProduct = action.payload?.data || action.payload;
            const index = state.products.findIndex(product => product._id === updateProduct._id);
            if(index !== -1){
                state.products[index] = updateProduct;
            }
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })  
        // fetch similar products
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading = false;
            const items = action.payload?.data || action.payload;
            state.similarProducts = Array.isArray(items) ? items : [];
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        }) 
    }

})
export const {setFilter,clearFilter} = productSlice.actions;
export default productSlice.reducer;