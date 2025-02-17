"use client";
import { useState } from "react";
import DesktopNavbar from "./Desktop"; // Import the Desktop
import MobileNavbar from "./Mobile"; // Import the Mobile Navbar

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-full p-6 bg-gray-800 text-white">
      {/* Desktop Navbar */}
      <DesktopNavbar />

      {/* Mobile Navbar */}
      <MobileNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Navbar;
