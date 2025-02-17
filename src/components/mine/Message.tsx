"use client";
import { motion } from "framer-motion";

const Message = ({ content, type }: { content: string; type: string }) => {
  const messageStyles: { [key: string]: string } = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  const messageVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <motion.div
      className={`mt-4 p-4 w-fit rounded-lg ${messageStyles[type]}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <p className="w-fit">{content}</p>
    </motion.div>
  );
};

export default Message;
