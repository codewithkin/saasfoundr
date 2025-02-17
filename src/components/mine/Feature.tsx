"use client";
import { motion } from "framer-motion";
import { User, Briefcase, MessageCircle, SearchCheck } from "lucide-react";

const features = [
  {
    title: "User Profiles & Matching",
    description: "Create detailed profiles to find the perfect co-founder based on skills, expertise, and industry focus.",
    icon: User,
    image: "/images/handshake.jpg",
    size: "lg",
  },
  {
    title: "Startup Listings",
    description: "Post your SaaS idea and find the right co-founder who complements your skills and vision.",
    icon: Briefcase,
    size: "sm",
  },
  {
    title: "Messaging & Connections",
    description: "Connect with potential co-founders through direct messaging and send connection requests to prevent spam.",
    icon: MessageCircle,
    size: "sm",
  },
  {
    title: "Advanced Filtering & Search",
    description: "Easily filter co-founder profiles by skills, availability, and other key criteria to find the right match.",
    icon: SearchCheck,
    image: "/images/search.jpg",
    size: "lg",
  },
];

const Feature = () => {
  return (
    <motion.div
      className="py-24 feature-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col justify-center items-center">
          <motion.h2 
            className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to find your perfect co-founder and launch your SaaS startup
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 ${
                feature.size === "lg" ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
