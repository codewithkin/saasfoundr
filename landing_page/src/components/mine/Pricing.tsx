"use client";
import { Check, X, HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    monthlyPrice: "$4.99",
    yearlyPrice: "$49.90",
    features: [
      { text: "1 profile", included: true, tooltip: "Create and manage one startup profile" },
      { text: "1 listing", included: true, tooltip: "Post one startup listing" },
      { text: "5 matches", included: true, tooltip: "Get up to 5 matching suggestions per month" },
      { text: "1 conversation", included: true, tooltip: "Start one conversation with potential matches" },
      { text: "Priority Support", included: false, tooltip: "Access to priority customer support" },
      { text: "Beta Features", included: false, tooltip: "Early access to new features" },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "$9.99",
    yearlyPrice: "$99.90",
    popular: true,
    features: [
      { text: "3 profiles", included: true, tooltip: "Create and manage up to 3 startup profiles" },
      { text: "5 listings", included: true, tooltip: "Post up to 5 startup listings" },
      { text: "15 matches", included: true, tooltip: "Get up to 15 matching suggestions per month" },
      { text: "10 conversations", included: true, tooltip: "Start up to 10 conversations with potential matches" },
      { text: "Priority Support", included: true, tooltip: "Access to priority customer support" },
      { text: "Beta Features", included: true, tooltip: "Early access to new features" },
    ],
  },
  {
    name: "Premium",
    monthlyPrice: "$15.99",
    yearlyPrice: "$159.90",
    features: [
      { text: "10 profiles", included: true, tooltip: "Create and manage up to 10 startup profiles" },
      { text: "Unlimited listings", included: true, tooltip: "Post unlimited startup listings" },
      { text: "Unlimited matches", included: true, tooltip: "Get unlimited matching suggestions" },
      { text: "Unlimited messages", included: true, tooltip: "Start unlimited conversations with potential matches" },
      { text: "24/7 Priority Support", included: true, tooltip: "Round-the-clock priority customer support" },
      { text: "Beta Features", included: true, tooltip: "Early access to new features" },
    ],
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container relative px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mb-8">
            Select the perfect plan for your startup journey
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
              Yearly <span className="text-green-500 font-medium">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`w-full md:w-96 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border-2 ${
                plan.popular
                  ? "border-blue-500 relative transform hover:-translate-y-2"
                  : "border-gray-200 hover:border-blue-500 hover:-translate-y-1"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isYearly ? 'year' : 'month'}</span>
                  {isYearly && (
                    <div className="mt-2 text-green-500 text-sm font-medium">
                      Save 20%
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group"
                    onMouseEnter={() => setHoveredTooltip(`${plan.name}-${index}`)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`${
                        feature.included ? "text-gray-900" : "text-gray-400"
                      } flex items-center gap-2`}
                    >
                      {feature.text}
                      <HelpCircle className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    {hoveredTooltip === `${plan.name}-${index}` && (
                      <div className="absolute z-10 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs ml-4">
                        {feature.tooltip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                className={`w-full mt-8 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                Save my seat
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
