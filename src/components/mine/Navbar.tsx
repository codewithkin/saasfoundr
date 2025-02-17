import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex justify-between items-center w-full p-6 bg-gray-800 text-white">
      <motion.div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">SaaSFoundr</h1>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden sm:flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/features" className="hover:underline">
            Features
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </motion.div>

      {/* Mobile Menu with Animation */}
      {isMenuOpen && (
        <motion.div
          className="sm:hidden bg-gray-800 text-white w-full p-4"
          variants={mobileMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Link href="/" className="block py-2 hover:bg-gray-700">
            Home
          </Link>
          <Link href="/about" className="block py-2 hover:bg-gray-700">
            About
          </Link>
          <Link href="/features" className="block py-2 hover:bg-gray-700">
            Features
          </Link>
          <Link href="/blog" className="block py-2 hover:bg-gray-700">
            Blog
          </Link>
          <Link href="/contact" className="block py-2 hover:bg-gray-700">
            Contact
          </Link>

          <Link
            href="/waitlist"
            className="block py-2 mt-4 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Join Waitlist
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
