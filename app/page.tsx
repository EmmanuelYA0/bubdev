import About from "@/components/home/About";
import Catalog from "@/components/home/Catalog";
import Hero from "@/components/home/Hero";
import { TestimonialsSection } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <Catalog/>
      <TestimonialsSection/>
      
    </>
  );
}
