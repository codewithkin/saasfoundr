"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is SaaSFoundr?",
    answer: "SaaSFoundr is a platform designed to help entrepreneurs find the perfect co-founder for their SaaS startup. We match founders based on skills, experience, and vision to create successful partnerships."
  },
  {
    question: "When will SaaSFoundr launch?",
    answer: "We're currently in the final stages of development and plan to launch in Q2 2025. Join our waitlist to be notified when we go live and get exclusive early access benefits."
  },
  {
    question: "How does the matching process work?",
    answer: "Our matching algorithm considers multiple factors including technical skills, business experience, industry focus, and startup goals. We use AI-powered compatibility scoring to suggest the most promising co-founder matches."
  },
  {
    question: "Is SaaSFoundr free to use?",
    answer: "We offer multiple pricing tiers including a basic free plan. Early adopters who join our waitlist will receive special pricing and benefits when we launch."
  },
  {
    question: "How do you verify potential co-founders?",
    answer: "We implement a thorough verification process including LinkedIn profile verification, optional background checks, and a review system. Our platform also encourages video calls before any serious commitment."
  },
  {
    question: "What makes SaaSFoundr different from other platforms?",
    answer: "SaaSFoundr is specifically designed for SaaS startups, with features tailored to tech entrepreneurship. We focus on meaningful matches based on complementary skills and shared vision, not just networking."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-lg font-medium text-gray-900 text-left">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openIndex === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 text-gray-600 text-left"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions?{" "}
              <a
                href="mailto:support@saasfoundr.com"
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
