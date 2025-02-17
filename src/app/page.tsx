"use client"; // Ensure this is a client-side rendered component

import { useState } from "react";
import Link from "next/link"; // Import Link component for internal navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import motion for animations

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ content: string; type: string }>({
    content: "",
    type: "",
  }); // To show success/error message

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ content: result.message, type: "success" }); // Success message
        setEmail(""); // Clear the input
      } else {
        setMessage(result.message); // Error message
      }
    } catch (error) {
      setMessage({ content: "Error processing subscription.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Message container styles
  const messageStyles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  // Motion animation variants
  const messageVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  // Header fade-in animation variants
  const headerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } },
  };

  // Mobile Menu Animation Variants
  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }, // Exit animation
  };

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Navbar Section */}
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
      </div>

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

          {/* Move Join Waitlist link here, so it only shows in mobile navbar */}
          <Link
            href="/waitlist"
            className="block py-2 mt-4 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Join Waitlist
          </Link>
        </motion.div>
      )}

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center px-12 space-y-8 text-center hero-section w-full h-full">
        {/* Header Section with Heading, Subheading, and CTA */}
        <header className="w-full text-center md:py-64 flex flex-col justify-center items-center gap-8">
          {/* Copy (text content) */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <motion.h2
              className="text-7xl font-bold"
              variants={headerVariants}
              initial="initial"
              animate="animate"
            >
              The Fastest Way to Find a{" "}
              <span className="py-1 px-6 rounded-xl bg-blue-500 text-white">
                Startup Partner
              </span>
            </motion.h2>
          </div>

          <motion.p
            className="text-lg md:max-w-6xl text-gray-500"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Find co-founders who complement your skills and vision. Our platform
            connects you with the right partner to turn your startup idea into a
            reality. Collaborate, innovate, and build something great together
            with the right team by your side.
          </motion.p>

          {/* Join Waitlist Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex gap-4 items-center justify-center"
            >
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 md:min-w-[300px] py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Email Address"
              />
              <Button
                type="submit"
                className="px-6 py-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                disabled={loading}
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            {/* Conditional Message with Animation */}
            {message.content.length > 0 && (
              <motion.div
                className={`mt-4 p-4 rounded-lg ${message.type === "success" ? messageStyles.success : messageStyles.error}`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <p>{message.content}</p>
              </motion.div>
            )}
          </div>
        </header>
      </main>

      <footer className="w-full p-6 bg-gray-800 text-white text-center">
        <p>&copy; 2025 SaaSFoundr. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
