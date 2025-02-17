"use client";

import Navbar from "@/components/mine/navbars/Main";
import Footer from "@/components/mine/Footer";
import { motion } from "framer-motion";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Nothing to see here...
          <span className="text-blue-600">yet!</span>
        </h1>
        <p className="text-gray-600 text-xl">
          Our blog is coming soon. Stay tuned for exciting content!
        </p>
      </motion.div>
      <Footer />
    </div>
  );
}
