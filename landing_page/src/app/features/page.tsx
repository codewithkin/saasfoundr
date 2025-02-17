"use client";

import Navbar from "@/components/mine/navbars/Main";
import Footer from "@/components/mine/Footer";
import { motion } from "framer-motion";
import { Code, Users, MessageCircle, Search, Shield, Rocket, Globe, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Technical Matching",
      description: "Find co-founders with complementary technical skills that match your project needs."
    },
    {
      icon: Users,
      title: "Founder Verification",
      description: "All founders are verified through a multi-step process to ensure authenticity."
    },
    {
      icon: MessageCircle,
      title: "Secure Messaging",
      description: "Built-in messaging system with end-to-end encryption for secure communications."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Advanced search filters to find the perfect co-founder based on multiple criteria."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Comprehensive safety measures to protect your information and ideas."
    },
    {
      icon: Rocket,
      title: "Startup Tools",
      description: "Access to essential tools and resources for your startup journey."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with founders from around the world, breaking geographical barriers."
    },
    {
      icon: Zap,
      title: "Quick Matching",
      description: "AI-powered matching algorithm to find compatible co-founders faster."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Modern Founders
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to find the perfect co-founder and build your dream startup.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
