"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const MobileNavbar = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="flex flex-col md:hidden w-full">
      {/* Mobile Menu Button */}
      <article className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold">SaaSFoundr</h1>

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
      </article>

      {/* Mobile Navbar */}
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

          {/* Mobile Join Waitlist Button */}
          <Link
            href="/waitlist"
            className="block py-2 mt-4 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Join Waitlist
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default MobileNavbar;
