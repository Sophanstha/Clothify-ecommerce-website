import React from 'react'
import Hero from '../component/Layout/Hero'
import GenderCollection from '../component/Product/GenderCollection'
import NewArival from '../component/Product/NewArival'
import BestSeller from '../component/Product/BestSeller'
import YouMayLike from '../component/Product/YouMayLike'
import Feature from '../component/Product/Feature'
import FeatureSection from '../component/Product/FeatureSection'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArival/>
      <h1 className='font-bold mt-6 text-center text-2xl text-shadow-initial '>Best Seller</h1>
        <BestSeller/>
        {/* <YouMayLike/> */}
        <Feature/>
        <FeatureSection/>
    </div>
  )
}

export default Home