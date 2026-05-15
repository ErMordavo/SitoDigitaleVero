import { LayoutShell } from "@/components/layout-shell"
import { HeroSection } from "@/components/sections/hero-section"
import { CategoriesSection } from "@/components/sections/categories-section"
import { ProductsSection } from "@/components/sections/products-section"
import { ServicesSection } from "@/components/sections/services-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { FloatingShapes } from "@/components/FloatingShapes";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function HomePage() {
  return (
    <LayoutShell>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <ServicesSection />
      <HowItWorksSection />
      <NewsletterSection />
      <FloatingShapes />
      <ParticlesBackground />
    </LayoutShell>
  )
}
