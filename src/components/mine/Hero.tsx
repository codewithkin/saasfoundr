"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"; // Make sure to import Tooltip
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ content: string; type: string }>({
    content: "",
    type: "",
  });

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
        setMessage({ content: result.message, type: "success" });
        setEmail("");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage({ content: "Error processing subscription.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const messageStyles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  const messageVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  const headerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } },
  };

  // Dummy image URLs for community connection and names
  const images = [
    { url: "/people/marc.png", name: "Marc Louvan" },
    { url: "/people/Andre.png", name: "Andre Flores" },
    { url: "/people/florin.png", name: "Florin Pop" },
    { url: "/people/Robin.png", name: "Robin Faraj" },
    { url: "/people/anthony.png", name: "Anthony Riera" },
  ];

  // Randomly shuffle the array of images to place them in random spots
  const randomImageIndexes = images.sort(() => Math.random() - 0.5);

  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-12 space-y-8 text-center hero-section w-full h-full relative">
      <header className="w-full text-center py-40 md:py-64 flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.h2
            className="text-4xl leading-10 md:leading-normal md:text-7xl font-medium md:font-semibold"
            variants={headerVariants}
            initial="initial"
            animate="animate"
          >
            The Fastest Way to Find a{" "}
            <span className="py-1 px-6 rounded-xl bg-blue-500 text-white block md:inline">
              Startup Partner
            </span>
          </motion.h2>

          <motion.p
            className="text-s md:text-lg md:max-w-6xl text-gray-500"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Find co-founders who complement your skills and vision. Our platform
            connects you with the right partner to turn your startup idea into
            reality and build something great together.
          </motion.p>
        </div>

        {/* Random image placements with tooltips */}
        <TooltipProvider>
          <div className="absolute top-10 left-10">
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={randomImageIndexes[0].url}
                  alt="Community Image"
                  className="rounded-full shadow-lg w-32 h-32 object-cover"
                />
              </TooltipTrigger>
              <TooltipContent>{randomImageIndexes[0].name}</TooltipContent>
            </Tooltip>
          </div>
          <div className="absolute top-20 right-20">
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={randomImageIndexes[1].url}
                  alt="Community Image"
                  className="rounded-full shadow-lg w-32 h-32 object-cover"
                />
              </TooltipTrigger>
              <TooltipContent>{randomImageIndexes[1].name}</TooltipContent>
            </Tooltip>
          </div>
          <div className="absolute bottom-20 left-20">
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={randomImageIndexes[2].url}
                  alt="Community Image"
                  className="rounded-full shadow-lg w-32 h-32 object-cover"
                />
              </TooltipTrigger>
              <TooltipContent>{randomImageIndexes[2].name}</TooltipContent>
            </Tooltip>
          </div>
          <div className="absolute bottom-10 right-10">
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={randomImageIndexes[3].url}
                  alt="Community Image"
                  className="rounded-full shadow-lg w-32 h-32 object-cover"
                />
              </TooltipTrigger>
              <TooltipContent>{randomImageIndexes[3].name}</TooltipContent>
            </Tooltip>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={randomImageIndexes[4].url}
                  alt="Community Image"
                  className="rounded-full shadow-lg w-32 h-32 object-cover"
                />
              </TooltipTrigger>
              <TooltipContent>{randomImageIndexes[4].name}</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center"
        >
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-fit px-4 md:min-w-[300px] py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Email Address"
          />
          <Button
            type="submit"
            className="px-6 py-6 bg-blue-600 w-full md:w-fit text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>

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
      </header>
    </section>
  );
}
