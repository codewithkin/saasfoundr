"use client";
import Link from "next/link";

interface DesktopNavbarProps {
  onWaitlistClick: () => void;
}

const DesktopNavbar = ({ onWaitlistClick }: DesktopNavbarProps) => {
  return (
    <div className="hidden sm:flex w-full justify-between items-center">
      <h1 className="text-3xl font-bold">SaaSFoundr</h1>

      {/* Desktop Navigation Links */}
      <nav className="flex space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/features" className="hover:underline">
          Features
        </Link>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>

      {/* Desktop Join Waitlist Button */}
      <button
        onClick={onWaitlistClick}
        className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Join Waitlist
      </button>
    </div>
  );
};

export default DesktopNavbar;
