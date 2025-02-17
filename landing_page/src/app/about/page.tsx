"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Rocket, Users, Target, LineChart } from "lucide-react";
import Navbar from "@/components/mine/navbars/Main";
import Footer from "@/components/mine/Footer";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const journey = [
    {
      title: "The Challenge",
      description: "As a 17-year-old developer from Zimbabwe, I found it incredibly difficult to connect with like-minded founders. Social media algorithms weren't helping - they were hindering.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "The Insight",
      description: "I realized that many young entrepreneurs face the same challenge: finding co-founders who share their passion and complement their skills, regardless of location.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "The Solution",
      description: "That's why I'm building SaaSFoundr - a platform that breaks down geographical barriers and connects founders based on what truly matters.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "The Future",
      description: "Together, we can create a global community where young founders can find their perfect match and build amazing products.",
      icon: <LineChart className="w-6 h-6" />
    }
  ];

  const values = [
    {
      title: "Youth Empowerment",
      description: "Age is just a number. We believe young founders deserve the same opportunities to build great products and find amazing co-founders.",
      icon: "⚡"
    },
    {
      title: "Global Connections",
      description: "Location shouldn't limit your potential. We're building a platform that connects founders across borders and time zones.",
      icon: "🌍"
    },
    {
      title: "Merit-Based Matching",
      description: "Our platform will focus on skills, passion, and compatibility - not follower counts or social media presence.",
      icon: "🎯"
    },
    {
      title: "Inclusive Community",
      description: "We're creating a space where founders from all backgrounds can connect, learn, and grow together.",
      icon: "🤝"
    }
  ];

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Breaking Down Barriers in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Co-Founder Matching
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I'm building SaaSFoundr to help young entrepreneurs like myself find the perfect 
              co-founders, regardless of location or background.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <p className="text-gray-600 mb-6">
                Hey! I'm Kin Leon Zinzombe, a 17-year-old developer from Zimbabwe with a passion 
                for building products that make a difference. Like many young entrepreneurs, 
                I've spent countless hours online searching for co-founders who share my vision.
              </p>
              <p className="text-gray-600 mb-6">
                But I quickly realized that existing platforms weren't designed for people like me. 
                Social media algorithms prioritize popularity over potential, making it nearly 
                impossible to find genuine connections based on skills and shared interests.
              </p>
              <p className="text-gray-600">
                That's why I'm building SaaSFoundr - to create the platform I wish existed when 
                I started my journey. A place where age, location, and follower count don't 
                determine your chances of finding the perfect co-founder.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/me.png"
                alt="Kin Leon Zinzombe"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">The Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From frustration to innovation - how SaaSFoundr came to be
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            {journey.map((item, index) => (
              <div 
                key={index}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles guiding us as we build SaaSFoundr
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Join Me on This Journey</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a young entrepreneur like me or someone who believes in 
              the power of meaningful connections, I invite you to be part of this 
              revolution in co-founder matching.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Join the Waitlist <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
