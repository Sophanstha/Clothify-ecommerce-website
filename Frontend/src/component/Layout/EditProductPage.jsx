import React, { useState } from 'react'

const EditProductPage = () => {
    const [productData,setProductDate] = useState({
        name :'',
        description:"",
        price:0,
        sku :"",
        countInStock:0,
        brand:"",
        size:[],
        color :[],
        collection:"",
        material:"",
        gender :"",
        images : [
            {
                url :"",
            },
            {
                url :"",
                
            }
        ]

    })
    const handleChnge =(e)=>{
        const {name,value} = e.target
        setProductDate((prev)=>({...prev,[name]: value}))
    }

    const handleFile = (e)=>{
        const file = e.target.files[0]
        console.log('====================================');
        console.log(file);
        console.log('====================================');
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('====================================');
        console.log(productData);
        console.log('====================================');
    }
  return (
   <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form
      onSubmit={handleSubmit}
      className="space-y-4">
        {/* Basic Details */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
          value={productData.name}
          onChange={handleChnge}
          type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
          value={productData.discription}
            onChange={handleChnge}
            name="description"
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
            onChange={handleChnge}
            value={productData.price}
              type="number"
              name="price"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">SKU</label>
            <input
            onChange={handleChnge}
            value={productData.sku}
              type="text"
              name="sku"
              className="w-full border rounded px-3 py-2"
              placeholder="SKU Code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Stock Count</label>
            <input
            onChange={handleChnge}
            value={productData.countInStock}
              type="number"
              name="countInStock"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Brand</label>
            <input
            value={productData.brand}
            onChange={handleChnge}
              type="text"
              name="brand"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Size & Color */}
        <div>
          <label className="block font-medium mb-1">Available Sizes</label>
          <input
          onChange={handleChnge}
          value={productData.size}
            type="text"
            name="size"
            placeholder="e.g. S, M, L"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Available Colors</label>
          <input
          value={productData.color}
          onChange={handleChnge}
            type="text"
            name="color"
            placeholder="e.g. Red, Blue"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Collection, Material, Gender */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Collection</label>
            <input
            onChange={handleChnge}
            value={productData.collection}
              type="text"
              name="collection"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Material</label>
            <input
            onChange={handleChnge}
            value={productData.material}
              type="text"
              name="material"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
            onChange={handleChnge}
            value={productData.gender}
              name="gender"
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Images */}
      <div>
  <label className="block font-medium mb-1">Product Images</label>
  <input
    //   value={}
        type="file"
        onChange={handleFile}
        
        className="flex-1 border rounded px-3 py-2"
      />
  {productData.images.map((img, index) => (
    <div key={index} className="flex items-center gap-4 mb-2">
      <img
        src={img.url || "https://via.placeholder.com/80"}
        alt={`Preview ${index + 1}`}
        className="w-20 h-20 object-cover border rounded"
      />
      
    </div>
  ))}
</div>


        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProductPage