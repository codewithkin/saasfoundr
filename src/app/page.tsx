import Feature from "@/components/mine/Feature";
import Footer from "@/components/mine/Footer";
import Hero from "@/components/mine/Hero";
import Navbar from "@/components/mine/navbars/Main";
import Pricing from "@/components/mine/Pricing";
import WaitList from "@/components/mine/WaitList";
import FAQ from "@/components/mine/FAQ";

export default function Home() {
  throw new Error ("Oh no!");
  return (
    <div className="flex flex-col bg-gray-100">
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <WaitList />
      <FAQ />
      <Footer />
    </div>
  );
}
