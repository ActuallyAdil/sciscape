import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MoleculeViewer } from "@/components/chemistry/MoleculeViewer";
import { PeriodicTable } from "@/components/chemistry/PeriodicTable";
import { motion } from "framer-motion";
import { FlaskConical, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const molecules = [
  { id: "water", name: "Water", formula: "H₂O", description: "Essential for life, universal solvent" },
  { id: "methane", name: "Methane", formula: "CH₄", description: "Simplest hydrocarbon, natural gas" },
  { id: "co2", name: "Carbon Dioxide", formula: "CO₂", description: "Greenhouse gas, photosynthesis reactant" },
  { id: "ethanol", name: "Ethanol", formula: "C₂H₅OH", description: "Alcohol found in beverages" },
] as const;

const ChemistryLab = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<"water" | "methane" | "co2" | "ethanol">("water");

  const currentMolecule = molecules.find(m => m.id === selectedMolecule);

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
              <div className="w-12 h-12 rounded-xl bg-chemistry flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Chemistry Lab</h1>
                <p className="text-muted-foreground">Visualize molecules and explore reactions</p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="molecules" className="space-y-6">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="molecules">Molecule Viewer</TabsTrigger>
              <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
              <TabsTrigger value="reactions" disabled>Reactions (Coming Soon)</TabsTrigger>
            </TabsList>

            <TabsContent value="molecules">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* 3D Viewer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <Card className="glass-card overflow-hidden">
                    <div className="h-[500px]">
                      <MoleculeViewer molecule={selectedMolecule} />
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{currentMolecule?.name}</h3>
                        <p className="text-sm text-muted-foreground font-mono">{currentMolecule?.formula}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <RotateCcw className="w-4 h-4" />
                        Drag to rotate
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Molecule Selection */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 glass-card">
                    <h3 className="font-semibold mb-4 text-lg">Select Molecule</h3>
                    <div className="space-y-3">
                      {molecules.map((molecule) => (
                        <Button
                          key={molecule.id}
                          variant={selectedMolecule === molecule.id ? "default" : "outline"}
                          className="w-full justify-start h-auto py-3"
                          onClick={() => setSelectedMolecule(molecule.id)}
                        >
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{molecule.name}</span>
                              <span className="text-xs font-mono opacity-70">{molecule.formula}</span>
                            </div>
                            <p className="text-xs opacity-70 mt-1">{molecule.description}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 glass-card mt-6">
                    <h3 className="font-semibold mb-3">Atom Colors</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#f0f0f0] border border-border" />
                        <span className="text-sm">Hydrogen (H)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#374151]" />
                        <span className="text-sm">Carbon (C)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ef4444]" />
                        <span className="text-sm">Oxygen (O)</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="periodic">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 glass-card">
                  <h3 className="font-semibold mb-6 text-lg">Interactive Periodic Table</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Click on any element to see its properties. The first 18 elements are shown.
                  </p>
                  <PeriodicTable />
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ChemistryLab;
