import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import YouMayLike from './YouMayLike';
const peoduct ={
  "name": "Classic Denim Jacket",
  "price": 85,
  "originalPrice": 120,
  "description": "A timeless denim jacket perfect for casual outings and layering.",
  "brand": "UrbanWear",
  "material": "Denim",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Blue", "Black"],
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "altText": "Classic blue denim jacket"
    },
    {
      "url": "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/25154390/2023/9/25/2d330ce2-d3d1-4fb8-9fe3-42e0ffea02f81695647436879HMRelaxed-FitDrop-ShoulderSweatshirt1.jpg",
      "altText": "Black denim jacket on hanger"
    }
  ]
}
// console.log('====================================');
// console.log(peoduct.images);
// console.log('====================================');

const BestSeller = () => {
  const[mainImage,setMainImage] = useState('');
  useEffect(()=>{
    if(peoduct?.images?.length > 0){
      setMainImage(peoduct.images[0].url)
    }
  },[peoduct])
    const[selectedColor,setSelectedColor] = useState('');
    const[selectedSize,setSelectedSize] = useState('')
    const[quantity,setquantity]= useState(1)


    const handlequantity =(value)=>{
      
        if(quantity >1 && value =="minus"){
          setquantity((prve)=>prve-1)
        }else if(value == "plus"){
          setquantity((prev)=>prev+1)
        } 
    
    }
    
      const handleAddCart=()=>{
        toast.success("added to cart")
      }

  return (
    <div>
      <div className='p-4 '>
        <div className='max-w-6xl mx-auto p-6 rounded-lg'>
          <div className='flex flex-col md:flex-row '>
            {/* {left tambmail} */}
            <div className='hidden md:flex flex-col mr-6 space-y-4'>
              {
                peoduct.images.map((image,index)=>(
                  <img
                  key={index}
                  className='w-20 h-20 rounded-lg border object-cover '
                  src={image.url}  alt='image'
                  onClick={()=>setMainImage(image.url)}
                  />
                ))
              }

            </div>
            {/* main image */}
            <div className='md:w-1/2'>
            <img className='w-full h-auto rounded-lg border' src={mainImage} alt="image1" />              
            </div>
            {/* mobile device */}
            <div className='md:hidden flex overflow-x-auto space-x-2 my-6'>
    {
                peoduct.images.map((image,index)=>(
                  <img
                  key={index}
                  className='w-20 h-20 rounded-lg border object-cover '
                  src={image.url}  alt='image'
                  onClick={()=> setMainImage(image.url)}
                  />
                ))
              }
            </div>
           <div className='w-full h-full  sm:ml-10  sm:w-1/2'>
            <h1 className='font-bold text-lg'>
              {peoduct.name}
            </h1>
            <h3 className='p-2 font-light'>
              $ {peoduct.originalPrice}
            </h3>
            <div className='sm:w-1/2 w-full'>
               <p className='text-lg'>{
              peoduct.description
              }</p>
            </div>
            <div>
              <p className='mb-1'>Color : </p>
              {
                peoduct.colors.map((color)=>(
                  <button
                  onClick={()=>setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border mr-1.5 ${selectedColor === color ? "border-black border-1" : "border-gray-100"}`} key={color} style={{
                    background:color
                  }}></button>
                ))
              }
            </div>
            <div className='flex-row gap-3 justify-center items-center'>
              <p className=''>Size : </p>
                <div className='flex gap-1.5'>
              {
                peoduct.sizes.map((size)=>(
                
                    <button 
                    onClick={()=>setSelectedSize(size)}
                    className={`border p-1 font-semibold text-[10px] ${size ==selectedSize ? "border-2 border-black":""}`}>{size}</button>
                
                ))
              }
              </div>
            </div>
           <div className='flex-row gap-3 justify-center items-center mt-3'>
              <p className=''>Quantity : </p>
              <div className='flex gap-3 mt-1'>
                <button
                onClick={()=>handlequantity("minus")}
                className='font-semibold bg-gray-300 px-2 py-1 rounded mb-3'>-</button>
                <span className='font-bold text-lg'>{quantity}</span>
                <button 
                onClick={()=>handlequantity("plus")}
                
                className='font-semibold bg-gray-300 px-2 py-1 rounded mb-3'>+</button>
              </div>
            </div> 
            <button 
            onClick={handleAddCart}
            className='w-[80%] bg-black text-white rounded mt-1.5 border p-1.5'>ADD TO CART</button>
              
              <div className='flex mt-2.5 gap-2 flex-col'>
                <h3 className='font-semibold '>characteristics </h3>
                <table className='w-full text-sm text-left text-gray-600'>
                  <tbody>
                    <tr>
                      <td className='py-1'>Brand</td>
                      <td className='py-1'>{peoduct.brand}</td>
                    </tr>
                    <tr>
                      <td className='py-1'>Material</td>
                      <td className='py-1'>{peoduct.material}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
       
       
          </div>
          </div>
          </div> 
      </div>
      <YouMayLike/>
    </div>
  )
}

export default BestSeller