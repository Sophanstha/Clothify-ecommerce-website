import React, { useEffect } from 'react'
import Footer from './component/Common/Footer'
import Header from './component/Common/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  const loaction = useLocation();

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loaction.pathname, loaction.search]);

  return (
      <div className="min-h-screen flex flex-col">
    <Toaster position="top-right" reverseOrder={false} />
    
    { loaction.pathname != "/login" && loaction.pathname != "/register" && !loaction.pathname.startsWith( "/admin")?(
     <>
     <Header/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
      </>
    ):(
        <main className="flex-grow">
        <Outlet/>
      </main>
    )
    }
    </div>
  )
}

export default App
