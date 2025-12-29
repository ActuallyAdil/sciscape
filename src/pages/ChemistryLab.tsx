import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOLECULES, MoleculeData } from "@/lib/molecules-data";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PeriodicTable } from "@/components/chemistry/PeriodicTable";

const MoleculeScene = ({ molecule, mode }: { molecule: MoleculeData; mode: 'ball-stick' | 'space-fill' }) => {
  const scaleFactor = mode === 'space-fill' ? 2.5 : 1;
  
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <group>
        {mode === 'ball-stick' && molecule.bonds.map((bond, i) => {
          const from = molecule.atoms[bond.from].position;
          const to = molecule.atoms[bond.to].position;
          const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2];
          const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
          const len = dir.length();
          dir.normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          
          return (
            <mesh key={`bond-${i}`} position={mid as [number, number, number]} quaternion={quat}>
              <cylinderGeometry args={[0.06, 0.06, len, 8]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
          );
        })}
        {molecule.atoms.map((atom, i) => (
          <mesh key={`atom-${i}`} position={atom.position}>
            <sphereGeometry args={[atom.radius * scaleFactor, 32, 32]} />
            <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const ChemistryLab = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<string>("water");
  const [viewMode, setViewMode] = useState<'ball-stick' | 'space-fill'>('ball-stick');
  
  const molecule = MOLECULES.find(m => m.id === selectedMolecule)!;

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chemistry flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Chemistry Lab</h1>
                <p className="text-sm text-muted-foreground">Explore molecules and reactions</p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="molecules" className="space-y-4">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="molecules">Molecule Viewer</TabsTrigger>
              <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
            </TabsList>

            <TabsContent value="molecules">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Card className="glass-card overflow-hidden">
                    <div className="h-[500px]">
                      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <MoleculeScene molecule={molecule} mode={viewMode} />
                        <OrbitControls enablePan={false} />
                        <Environment preset="studio" />
                      </Canvas>
                    </div>
                    <div className="p-4 border-t border-border flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{molecule.name}</h3>
                        <p className="text-sm font-mono text-muted-foreground">{molecule.formula}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="view-mode" className="text-sm">Space-fill</Label>
                        <Switch id="view-mode" checked={viewMode === 'space-fill'} onCheckedChange={(c) => setViewMode(c ? 'space-fill' : 'ball-stick')} />
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="p-4 glass-card">
                    <h3 className="font-semibold mb-3">Select Molecule</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {MOLECULES.map((m) => (
                        <Button key={m.id} variant={selectedMolecule === m.id ? "default" : "outline"} className="w-full justify-start text-left h-auto py-2" onClick={() => setSelectedMolecule(m.id)}>
                          <div>
                            <div className="font-medium">{m.name} <span className="font-mono text-xs opacity-70">{m.formula}</span></div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-4 glass-card">
                    <h3 className="font-semibold mb-3">Properties</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Formula</span><span className="font-mono">{molecule.formula}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Mol. Weight</span><span className="font-mono">{molecule.molecularWeight} g/mol</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Bonds</span><span className="font-mono">{molecule.bonds.length}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">State</span><span>{molecule.properties.state}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Boiling Pt</span><span>{molecule.properties.boilingPoint}</span></div>
                      <div className="pt-2 border-t"><span className="text-muted-foreground">Angles:</span> {molecule.bondAngles.join(', ')}</div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="periodic">
              <Card className="p-6 glass-card">
                <PeriodicTable />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ChemistryLab;
