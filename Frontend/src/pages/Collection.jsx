import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import FilterBar from '../component/Layout/FilterBar';
import ShortOption from '../component/Layout/ShortOption';
import YouMayLike from '../component/Product/YouMayLike';
const Collection = () => {
const [product,setProduct] = useState([]);
const openFilterRef = useRef(null);
const[isFilterBarOpen,setIsFilterOpen] = useState(false);

const toggleFilterBar = ()=>{
    setIsFilterOpen(!isFilterBarOpen)
}
const handleClickOutSide =(e)=>{
    if(openFilterRef.current && !openFilterRef.current.contains(e.tagget.value) ){
        setIsFilterOpen(false)
    }
}
useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutSide)
    return ()=>{
    document.removeEventListener("mousedown",handleClickOutSide)
    }
},[])

    return (
    <div className='flex flex-col lg:flex-row'>
        {/* mobile devices */}
        <button
        onClick={toggleFilterBar}
        className='lg:hidden border px-2 flex justify-center items-center'>
            <FaFilter /> Filter
        </button>

        <div ref={openFilterRef} className={`${isFilterBarOpen ? "translate-x-0 ":"-translate-x-full"} fixed z-100 inset-y-0 left-0 overflow-y-auto lg:scrollbar-hide transition-transform  lg:sticky lg:translate-x-0 `}>
                <FilterBar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='uppercase mb-4 text-2xl'>All Collection</h2>
            {/* Sort Option  */}
            <div className='flex justify-end'>
                 <ShortOption/>
            </div>
           

            {/* you amy like it */}
            <YouMayLike/>
        </div>

    </div>
  )
}

export default Collection