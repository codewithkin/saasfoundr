"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface MobileNavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onWaitlistClick: () => void;
}

const MobileNavbar = ({
  isMenuOpen,
  setIsMenuOpen,
  onWaitlistClick,
}: MobileNavbarProps) => {
  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  const handleWaitlistClick = () => {
    setIsMenuOpen(false);
    onWaitlistClick();
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
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/features"
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/blog"
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Join Waitlist Button */}
            <button
              onClick={handleWaitlistClick}
              className="w-full py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Join Waitlist
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default MobileNavbar;
