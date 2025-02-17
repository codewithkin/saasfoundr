"use client"; // Ensure this is a client-side rendered component

import { useState } from "react";
import Link from "next/link"; // Import Link component for internal navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace this with your actual form submission logic (e.g., API call)
      console.log("Email submitted:", email);
      
      setEmail(""); // Clear the email input
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setLoading(false);
    }
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

      <main className="flex flex-col items-center justify-center p-12 space-y-8 text-center">
        <h2 className="text-7xl font-bold">The Fastest Way to Find a Startup Partner</h2>
        <p className="text-lg md:max-w-4xl">
          Find co-founders who complement your skills and vision. Our platform connects you with the right partner to turn your startup idea into a reality. Collaborate, innovate, and build something great together with the right team by your side
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
        </div>
      </main>

      <footer className="w-full p-6 bg-gray-800 text-white text-center">
        <p>&copy; 2025 SaaSFoundr. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
