"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Advanced Analytics",
    description: "Gain actionable insights with our in-depth analytics tools.",
    icon: "/icons/analytics.svg",
    pattern: "/patterns/circuit-board.svg",
  },
  {
    title: "Real-time Notifications",
    description: "Get notified instantly about important events in your app.",
    icon: "/icons/notification.svg",
    pattern: "/patterns/topography.svg",
  },
  {
    title: "Seamless Integrations",
    description: "Easily integrate with your favorite tools and services.",
    icon: "/icons/integration.svg",
    pattern: "/patterns/hexagons.svg",
  },
  {
    title: "Customizable Dashboard",
    description: "Create a personalized dashboard to fit your workflow.",
    icon: "/icons/dashboard.svg",
    pattern: "/patterns/dots.svg",
  },
];

const Feature = () => {
  return (
    <div className="bg-gray-900 py-16 feature-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700 bg-gray-800 bg-opacity-80"
              style={{
                backgroundImage: `url(${feature.pattern})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for better visibility */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-md" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white text-center mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;