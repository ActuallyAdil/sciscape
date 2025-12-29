import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { LabCards } from "@/components/home/LabCards";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LabCards />
      <FeaturesSection />

      {/* Concept Graph CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-concept/20 flex items-center justify-center mx-auto mb-6">
              <Network className="w-8 h-8 text-concept" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See How Everything Connects
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Concept Graph visualizes relationships between physics, chemistry, and biology.
              Explore prerequisites, discover connections, and chart your learning path.
            </p>
            <Link to="/concepts">
              <Button size="lg" variant="outline" className="group">
                Explore the Concept Graph
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-semibold">SciScape</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive science exploration platform
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
