import React, { useState, useEffect } from "react";
import Hero from "../component/Layout/Hero";
import GenderCollection from "../component/Product/GenderCollection";
import NewArival from "../component/Product/NewArival";
import BestSeller from "../component/Product/BestSeller";
import YouMayLike from "../component/Product/YouMayLike";
import Feature from "../component/Product/Feature";
import FeatureSection from "../component/Product/FeatureSection";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { Skiper15 } from "../component/ui/skiper15";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check if visitor has already seen the preloader in this session
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem("clothify_landing_visited");
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("clothify_landing_visited", "true");
    setShowPreloader(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 3D Box Loading Preloader (@skiper-ui/skiper15) */}
      {showPreloader && (
        <Skiper15 onComplete={handlePreloaderComplete} duration={2400} />
      )}

      <div className="overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        {/* Gender Collection */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <GenderCollection />
        </motion.div>

        {/* New Arrivals */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <NewArival />
        </motion.div>

        {/* Best Seller */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-extrabold mt-12 mb-2 text-center text-3xl text-gray-900 tracking-tight">
            Best Seller
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Our most loved and purchased pieces this season
          </p>
          <BestSeller
            trendingSlot={
              <div className="my-4">
                <YouMayLike
                  title="Trending & Recommended"
                  subtitle="Discover curated styles in our 3D perspective collection"
                />
              </div>
            }
          />
        </motion.div>

        {/* Features */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Feature />
        </motion.div>

        {/* Feature Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <FeatureSection />
        </motion.div>

        {/* Smooth Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center cursor-pointer transition-colors border-2 border-white"
            >
              <FaArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;