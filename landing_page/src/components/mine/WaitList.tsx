"use client";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Gift, Users, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function WaitList() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual waitlist signup logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: Rocket,
      title: "Early Access",
      description: "Be among the first to use SaaSFoundr when we launch"
    },
    {
      icon: Gift,
      title: "Founder Benefits",
      description: "Get 3 months free on any plan when we launch"
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Join our private community of early adopters"
    },
    {
      icon: Clock,
      title: "Priority Support",
      description: "Get priority support during and after launch"
    }
  ];

  return (
    <motion.section
      className="py-20 feature-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Waitlist Today
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Be first in line when we launch. Get exclusive benefits and early access to the platform.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex md:flex-row flex-col w-full gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-500 w-fit text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      Join
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 text-green-300 p-4 rounded-lg max-w-md mx-auto"
            >
              <p className="font-medium">🎉 You're on the list!</p>
              <p className="text-sm mt-1">We'll notify you when we launch.</p>
            </motion.div>
          )}

          <p className="text-gray-400 text-sm mt-4">
            Join 450+ founders already on the waitlist
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <benefit.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
