"use client";
import Link from "next/link";

const DesktopNavbar = () => {
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
      <Link
        href="/waitlist"
        className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Join Waitlist
      </Link>
    </div>
  );
};

export default DesktopNavbar;
