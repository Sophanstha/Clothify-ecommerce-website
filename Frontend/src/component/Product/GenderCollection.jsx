import React from "react";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <>
      <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative flex-1">
            <img
              src={
                "https://i.pinimg.com/1200x/71/11/bd/7111bde86a43351904b8f6fc92224596.jpg"
              }
              alt="bgmen"
              className="w-full h-[400px] object-cover "
            />
            <div className="absolute bottom-8 left-8  bg-opaciity-90 p-4" style={{backgroundColor : 'rgba(61, 50, 50, 0.5)'}}>
                <h2 className="text-2xl font-bold mb-3 text-gray-300 ">Men Collection </h2>
            <Link to={"/collections/all?gender=men"} >
            show now
            </Link>
            </div>
          </div>
       
       
          <div className="relative flex-1">
            <img
              src={
                "https://i.pinimg.com/736x/1c/f5/5b/1cf55b40379e86f92442c62f3e48c576.jpg"
              }
              alt="bgmen"
              className="w-full h-[400px] object-cover object-center"
            />
            <div className="absolute bottom-8 left-8  bg-opaciity-90 p-4" style={{backgroundColor : 'rgba(61, 50, 50, 0.5)'}}>
                <h2 className="text-2xl font-bold mb-3 text-gray-300 ">Women Collection </h2>
            <Link to={"/collections/all?gender=women"} >
            show now
            </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenderCollection;
