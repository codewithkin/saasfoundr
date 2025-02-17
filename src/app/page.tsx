import Footer from "@/components/mine/Footer";
import Hero from "@/components/mine/Hero";
import Navbar from "@/components/mine/navbars/Main";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
