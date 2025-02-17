import Feature from "@/components/mine/Feature";
import Footer from "@/components/mine/Footer";
import Hero from "@/components/mine/Hero";
import Navbar from "@/components/mine/navbars/Main";
import Pricing from "@/components/mine/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <Footer />
    </div>
  );
}
