import { Layout } from "@/components/layout/Layout";
import { CellViewer } from "@/components/biology/CellViewer";
import { motion } from "framer-motion";
import { Dna, Info, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const organelles = [
  { name: "Nucleus", color: "bg-primary", description: "Contains DNA and controls cell activities" },
  { name: "Mitochondria", color: "bg-chemistry", description: "Powerhouse of the cell, produces ATP" },
  { name: "Ribosomes", color: "bg-concept", description: "Synthesize proteins from amino acids" },
  { name: "Endoplasmic Reticulum", color: "bg-blue-500", description: "Transports materials within the cell" },
  { name: "Cell Membrane", color: "bg-biology", description: "Controls what enters and exits the cell" },
];

const BiologyExplorer = () => {
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
              <div className="w-12 h-12 rounded-xl bg-biology flex items-center justify-center">
                <Dna className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Biology Explorer</h1>
                <p className="text-muted-foreground">Dive into cells, DNA, and living systems</p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="cell" className="space-y-6">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="cell">Cell Structure</TabsTrigger>
              <TabsTrigger value="dna" disabled>DNA (Coming Soon)</TabsTrigger>
              <TabsTrigger value="anatomy" disabled>Anatomy (Coming Soon)</TabsTrigger>
            </TabsList>

            <TabsContent value="cell">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* 3D Cell Viewer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <Card className="glass-card overflow-hidden">
                    <div className="h-[500px]">
                      <CellViewer />
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          This is an animal cell. Drag to rotate and explore its organelles. The cell auto-rotates for a complete view.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Organelle Legend */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 glass-card">
                    <h3 className="font-semibold mb-4 text-lg">Cell Organelles</h3>
                    <div className="space-y-4">
                      {organelles.map((organelle) => (
                        <div key={organelle.name} className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full ${organelle.color} mt-0.5 flex-shrink-0`} />
                          <div>
                            <h4 className="font-medium text-sm">{organelle.name}</h4>
                            <p className="text-xs text-muted-foreground">{organelle.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 glass-card mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Zoom Levels</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Future versions will let you zoom from organism level down to molecular structures.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-muted">Organism</span>
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-muted">Organ</span>
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary">Cell</span>
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-muted">Molecule</span>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Cell Facts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 grid md:grid-cols-3 gap-4"
              >
                <Card className="p-6 glass-card">
                  <h3 className="font-semibold mb-2">Cell Theory</h3>
                  <p className="text-sm text-muted-foreground">
                    All living organisms are made of cells. Cells are the basic unit of life and come from pre-existing cells.
                  </p>
                </Card>
                <Card className="p-6 glass-card">
                  <h3 className="font-semibold mb-2">Eukaryotic vs Prokaryotic</h3>
                  <p className="text-sm text-muted-foreground">
                    Eukaryotic cells (shown) have a nucleus. Prokaryotic cells (bacteria) lack membrane-bound organelles.
                  </p>
                </Card>
                <Card className="p-6 glass-card">
                  <h3 className="font-semibold mb-2">ATP Production</h3>
                  <p className="text-sm text-muted-foreground">
                    Mitochondria produce ATP through cellular respiration, converting glucose and oxygen into energy.
                  </p>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default BiologyExplorer;
