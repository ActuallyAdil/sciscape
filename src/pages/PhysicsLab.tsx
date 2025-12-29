import { useState, useCallback, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GravitySimulation } from "@/components/physics/GravitySimulation";
import { ControlPanel } from "@/components/physics/ControlPanel";
import { DataGraph } from "@/components/physics/DataGraph";
import { motion } from "framer-motion";
import { Atom, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataPoint {
  time: number;
  position: number;
  velocity: number;
}

const PhysicsLab = () => {
  const [gravity, setGravity] = useState(9.8);
  const [bounciness, setBounciness] = useState(0.8);
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const timeRef = useRef(0);

  const handleUpdate = useCallback((position: number, velocity: number) => {
    timeRef.current += 1;
    setData(prev => {
      const newData = [...prev, { time: timeRef.current, position, velocity }];
      return newData.slice(-200);
    });
  }, []);

  const handleReset = () => {
    setData([]);
    timeRef.current = 0;
  };

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
              <div className="w-12 h-12 rounded-xl bg-physics flex items-center justify-center">
                <Atom className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Physics Lab</h1>
                <p className="text-muted-foreground">Explore motion, forces, and energy</p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="gravity" className="space-y-6">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="gravity">Gravity & Motion</TabsTrigger>
              <TabsTrigger value="waves" disabled>Waves (Coming Soon)</TabsTrigger>
              <TabsTrigger value="electricity" disabled>Electricity (Coming Soon)</TabsTrigger>
            </TabsList>

            <TabsContent value="gravity">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Simulation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <Card className="glass-card overflow-hidden">
                    <div className="h-[500px]">
                      <GravitySimulation
                        gravity={gravity}
                        bounciness={bounciness}
                        onUpdate={handleUpdate}
                      />
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          Drag to rotate the view. Adjust gravity and bounciness to see how they affect the ball's motion.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Controls & Data */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <ControlPanel
                    gravity={gravity}
                    setGravity={setGravity}
                    bounciness={bounciness}
                    setBounciness={setBounciness}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    onReset={handleReset}
                  />

                  <DataGraph data={data} />
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Concept Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid md:grid-cols-3 gap-4"
          >
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-2">Gravity (g)</h3>
              <p className="text-sm text-muted-foreground">
                The acceleration due to gravity. Earth's gravity is 9.8 m/s². Try simulating other planets!
              </p>
            </Card>
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-2">Kinetic Energy</h3>
              <p className="text-sm text-muted-foreground">
                Energy of motion. The faster an object moves, the more kinetic energy it has (KE = ½mv²).
              </p>
            </Card>
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-2">Coefficient of Restitution</h3>
              <p className="text-sm text-muted-foreground">
                How bouncy an object is. 1.0 = perfect bounce, 0 = no bounce (all energy absorbed).
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PhysicsLab;
