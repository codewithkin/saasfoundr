"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmail } from "@/lib/loopso";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const response = await sendEmail(email);
    setMessage(response ? "You're on the waitlist!" : "Something went wrong.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-4">
          Find Your Perfect Co-Founder, Fast.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-8">
          Join a community of ambitious entrepreneurs and discover the ideal co-founder to bring your startup vision to life.
        </p>

        {/* Hero Image or Illustration */}
        <div className="w-full max-w-3xl flex justify-center mb-8">
          <img
            src="https://via.placeholder.com/600x400.png?text=Co-Founder+Match"
            alt="People collaborating on a startup"
            className="rounded-lg shadow-xl"
          />
        </div>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4 w-full sm:w-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80"
          />
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Join Waitlist
          </Button>
        </form>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </header>

      {/* Why SaaSFoundr Section */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose SaaSFoundr?</h2>
        <p className="text-lg text-gray-600 mb-4">
          SaaSFoundr helps you connect with co-founders that share your vision and skills, so you can focus on building your dream startup.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast, Simple Matching</h3>
            <p className="text-gray-600">
              Quickly find a co-founder who complements your skills and goals, and start building your business faster.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community of Entrepreneurs</h3>
            <p className="text-gray-600">
              Join a thriving network of like-minded entrepreneurs who are serious about building successful startups.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Collaboration</h3>
            <p className="text-gray-600">
              Seamlessly connect, communicate, and collaborate with potential co-founders to bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-4 text-center bg-gray-800 text-white">
        <p>&copy; 2025 SaaSFoundr. All rights reserved.</p>
      </footer>
    </div>
  );
}
