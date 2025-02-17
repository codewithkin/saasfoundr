"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

interface WaitListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitListModal({ isOpen, onClose }: WaitListModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        setEmail("");
      } else {
        setSubmitStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      title: "Early Access",
      description: "Be among the first to use our platform and shape its future. Get exclusive features before anyone else."
    },
    {
      title: "Founder Benefits",
      description: "Receive dedicated support, priority feature requests, and special perks designed specifically for early adopters."
    },
    {
      title: "Priority Matching",
      description: "Get first access to our co-founder matching algorithm and connect with the perfect partner for your startup journey."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-6">
                    Join the
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}Waitlist
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Be first in line when we launch. Get exclusive benefits and early access to shape the future of co-founder matching.
                  </p>
                </div>

                {submitStatus.type === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-800 p-8 rounded-xl text-center max-w-2xl mx-auto"
                  >
                    <h3 className="text-2xl font-semibold mb-4">🎉 You're In!</h3>
                    <p className="text-lg">{submitStatus.message}</p>
                  </motion.div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-6 mb-16 max-w-2xl mx-auto">
                      {submitStatus.type === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 text-red-800 p-4 rounded-lg text-base"
                        >
                          {submitStatus.message}
                        </motion.div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-colors flex items-center gap-2 whitespace-nowrap text-lg justify-center sm:justify-start"
                        >
                          {isSubmitting ? (
                            "Joining..."
                          ) : (
                            <>
                              Join Now
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="grid md:grid-cols-3 gap-8">
                      {benefits.map((benefit) => (
                        <div
                          key={benefit.title}
                          className="p-8 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
