"use client";
import { useState } from "react";
import DesktopNavbar from "./Desktop"; 
import MobileNavbar from "./Mobile"; 
import WaitListModal from "../WaitListModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center w-full p-6 bg-gray-800 text-white">
        {/* Desktop Navbar */}
        <DesktopNavbar onWaitlistClick={() => setIsModalOpen(true)} />

        {/* Mobile Navbar */}
        <MobileNavbar 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          onWaitlistClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Waitlist Modal */}
      <WaitListModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
