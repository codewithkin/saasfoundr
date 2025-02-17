"use client";
import { motion } from "framer-motion";
import { BarChart, Bell, Plug, LayoutDashboard, User, Briefcase, MessageCircleDashed, SearchCheck, MessageCircle } from "lucide-react";

const features = [
  {
    title: "User Profiles & Matching",
    description: "Create detailed profiles to find the perfect co-founder based on skills, expertise, and industry focus.",
    icon: User,  // Choose a relevant icon like User from lucide-react
    image: "/images/user-profiles.png",  // You can update the image to reflect this feature
    pattern: "/patterns/network.svg",
    size: "lg",
  },
  {
    title: "Startup Listings",
    description: "Post your SaaS idea and find the right co-founder who complements your skills and vision.",
    icon: Briefcase,  // A relevant icon like Briefcase
    pattern: "/patterns/idea.svg",
    size: "sm",
  },
  {
    title: "Messaging & Connections",
    description: "Connect with potential co-founders through direct messaging and send connection requests to prevent spam.",
    icon: MessageCircle,  // A messaging-related icon
    pattern: "/patterns/connection.svg",
    size: "sm",
  },
  {
    title: "Advanced Filtering & Search",
    description: "Easily filter co-founder profiles by skills, availability, and other key criteria to find the right match.",
    icon: SearchCheck,  // An icon related to search
    image: "/images/filtering.png",  // You can update the image for this feature
    pattern: "/patterns/search.svg",
    size: "lg",
  },
];



const Feature = () => {
  return (
    <motion.div
      className="bg-gray-900 py-16 feature-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Copy (headline and subheadline) */}
        <article className="mb-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold text-white">Features</h2>
          <p className="text-white text-center">
            We know what you're thinking, why should I join SaaSFoundr ? Well,
            you'll gain access to.....
          </p>
        </article>

        {/* Bento Grid Layout */}
        <div className="flex flex-col gap-6">
          {/* First Row: Large (75%) + Small (25%) */}
          <div className="flex flex-col lg:flex-row gap-6">
            {features.slice(0, 2).map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-xl shadow-lg overflow-hidden border border-gray-300 bg-white bg-opacity-80 neon-glow flex 
                  ${feature.size === "lg" ? "lg:w-3/4 flex-row" : "lg:w-1/4 flex-col"}`}
                style={{
                  backgroundImage: `url(${feature.pattern})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md" />

                {/* Content Section */}
                <div className="relative z-10 p-6 flex flex-col justify-center text-left w-fit gap-4">
                  <div className="p-4 rounded-full bg-gradient-to-tl from-sky-300 to-purple-800 flex flex-col gap-4 w-fit hover:from-blue-500 hover:to-sky-800 hover:cursor-pointer">
                    <feature.icon
                      strokeWidth={1.5}
                      className="md:w-12 w-8 md:h-12 h-8 text-white"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-700">{feature.description}</p>
                </div>

                {/* Image ONLY on Large Cards */}
                {feature.size === "lg" && feature.image && (
                  <div className="relative w-1/2 hidden lg:block">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-r-xl"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Second Row: Small (25%) + Large (75%) */}
          <div className="flex flex-col lg:flex-row gap-6">
            {features.slice(2, 4).map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-xl shadow-lg overflow-hidden border border-gray-300 bg-white bg-opacity-80 neon-glow flex 
                  ${feature.size === "lg" ? "lg:w-3/4 flex-row" : "lg:w-1/4 flex-col"}`}
                style={{
                  backgroundImage: `url(${feature.pattern})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md" />

                {/* Content Section */}
                <div className="relative z-10 p-6 flex flex-col justify-center text-left w-fit gap-4">
                  <div className="p-4 rounded-full bg-gradient-to-tl from-sky-300 to-purple-800 flex flex-col gap-4 w-fit hover:from-blue-500 hover:to-sky-800 hover:cursor-pointer">
                    <feature.icon
                      strokeWidth={1.5}
                      className="md:w-12 w-8 md:h-12 h-8 text-white"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-700">{feature.description}</p>
                </div>

                {/* Image ONLY on Large Cards */}
                {feature.size === "lg" && feature.image && (
                  <div className="relative w-1/2 hidden lg:block">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-r-xl"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
