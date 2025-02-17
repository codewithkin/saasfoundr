"use client"; // Ensure this is a client-side rendered component

import { useState } from "react";
import Link from "next/link"; // Import Link component for internal navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import motion for animations

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ content: string, type: string }>({ content: "", type: "" });  // To show success/error message

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      setTimeout(() => {
        setMessage({ content: "", type: "" });
      }, 5000); // Clears the message after 5 seconds
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

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <header className="flex justify-between items-center w-full p-6 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">SaaSFoundr</h1>
        <nav className="space-x-6">
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
        <Link
          href="/waitlist"
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
        >
          Join Waitlist
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center p-12 space-y-8 text-center hero-section w-full h-full">
        <h2 className="text-7xl font-bold">The Fastest Way to Find a <span className="py-2 px-6 rounded-xl bg-blue-500 text-white">Startup Partner</span></h2>
        <p className="text-lg md:max-w-6xl">
          Find co-founders who complement your skills and vision. Our platform connects you with the right partner to turn your startup idea into a reality. Collaborate, innovate, and build something great together with the right team by your side.
        </p>

        {/* Join Waitlist Form */}
        <div>
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
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
              className={`mt-4 p-4 rounded-lg ${message.type === 'success' ? messageStyles.success : messageStyles.error}`}
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
      </main>

      <footer className="w-full p-6 bg-gray-800 text-white text-center">
        <p>&copy; 2025 SaaSFoundr. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
