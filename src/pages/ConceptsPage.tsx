import { Layout } from "@/components/layout/Layout";
import { ConceptGraph } from "@/components/concepts/ConceptGraph";
import { motion } from "framer-motion";
import { Network, Info, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const learningPaths = [
  {
    title: "Energy Fundamentals",
    concepts: ["Motion", "Forces", "Energy", "Thermodynamics", "Metabolism"],
    description: "Trace energy from physics through chemistry to biology",
    color: "bg-physics",
  },
  {
    title: "Atomic to Cellular",
    concepts: ["Atoms", "Chemical Bonds", "Reactions", "Cells", "DNA"],
    description: "From atomic structure to the building blocks of life",
    color: "bg-chemistry",
  },
  {
    title: "Systems Thinking",
    concepts: ["Waves", "Electricity", "Reactions", "Metabolism", "Ecology"],
    description: "Understand how systems interact across all sciences",
    color: "bg-biology",
  },
];

const ConceptsPage = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-concept flex items-center justify-center">
                <Network className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Concept Graph</h1>
                <p className="text-muted-foreground">Visualize how scientific concepts connect</p>
              </div>
            </div>
          </motion.div>

          {/* Main Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 glass-card">
              <div className="flex items-start gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Hover over concepts to see their connections. Click to explore details.
                </p>
              </div>
              <ConceptGraph />
            </Card>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Suggested Learning Paths</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 glass-card h-full flex flex-col">
                    <div className={`w-10 h-10 rounded-lg ${path.color} flex items-center justify-center mb-4`}>
                      <Network className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4 flex-1">
                      {path.concepts.map((concept, i) => (
                        <span
                          key={concept}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted"
                        >
                          {concept}
                          {i < path.concepts.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Path
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Jump to Lab</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/physics">
                <Card className="p-4 glass-card hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-physics flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Physics Lab</h3>
                      <p className="text-xs text-muted-foreground">Motion, forces, energy</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link to="/chemistry">
                <Card className="p-4 glass-card hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-chemistry flex items-center justify-center">
                      <span className="text-xl">🧪</span>
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Chemistry Lab</h3>
                      <p className="text-xs text-muted-foreground">Molecules, reactions</p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link to="/biology">
                <Card className="p-4 glass-card hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-biology flex items-center justify-center">
                      <span className="text-xl">🧬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">Biology Explorer</h3>
                      <p className="text-xs text-muted-foreground">Cells, DNA, life</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ConceptsPage;
