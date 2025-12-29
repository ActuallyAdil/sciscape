import { useState, useEffect, useCallback, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { PhysicsSimulation } from "@/components/physics/PhysicsSimulation";
import { PhysicsControls } from "@/components/physics/PhysicsControls";
import { PhysicsReadouts } from "@/components/physics/PhysicsReadouts";
import { PhysicsGraphs } from "@/components/physics/PhysicsGraphs";
import { motion } from "framer-motion";
import { Atom } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  PhysicsState, 
  PhysicsConfig, 
  createInitialState, 
  updatePhysics,
  SavedExperiment 
} from "@/lib/physics-engine";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataPoint {
  time: number;
  positionY: number;
  positionX: number;
  velocityY: number;
  velocityX: number;
  speed: number;
}

const PhysicsLab = () => {
  const [config, setConfig] = useState<PhysicsConfig>({
    gravity: 9.81,
    airResistance: 0.01,
    bounciness: 0.8,
    groundY: 0.4,
    maxTrailLength: 500,
  });

  const [initialVelocity, setInitialVelocity] = useState({ x: 2, y: 0 });
  const [mass, setMass] = useState(1);
  const [startHeight, setStartHeight] = useState(5);
  const [selectedPreset, setSelectedPreset] = useState("Earth");

  const [state, setState] = useState<PhysicsState>(() => 
    createInitialState(0, startHeight, initialVelocity.x, initialVelocity.y, mass)
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrail, setShowTrail] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [data, setData] = useState<DataPoint[]>([]);
  
  const [savedExperiments, setSavedExperiments] = useLocalStorage<SavedExperiment[]>('physics-experiments', []);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [experimentName, setExperimentName] = useState("");

  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const reset = useCallback(() => {
    setState(createInitialState(0, startHeight, initialVelocity.x, initialVelocity.y, mass));
    setData([]);
    setIsPlaying(false);
  }, [startHeight, initialVelocity, mass]);

  const step = useCallback(() => {
    setState(prev => {
      const newState = updatePhysics(prev, config, 0.016);
      setData(d => [...d, {
        time: newState.time,
        positionY: newState.position.y,
        positionX: newState.position.x,
        velocityY: newState.velocity.y,
        velocityX: newState.velocity.x,
        speed: Math.sqrt(newState.velocity.x ** 2 + newState.velocity.y ** 2),
      }].slice(-300));
      return newState;
    });
  }, [config]);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      setState(prev => {
        const newState = updatePhysics(prev, config, dt);
        setData(d => [...d, {
          time: newState.time,
          positionY: newState.position.y,
          positionX: newState.position.x,
          velocityY: newState.velocity.y,
          velocityX: newState.velocity.x,
          speed: Math.sqrt(newState.velocity.x ** 2 + newState.velocity.y ** 2),
        }].slice(-300));
        return newState;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, config]);

  useKeyboardShortcuts([
    { key: ' ', action: () => setIsPlaying(p => !p), description: 'Play/Pause' },
    { key: 'r', action: reset, description: 'Reset' },
    { key: 's', action: step, description: 'Step' },
    { key: 't', action: () => setShowTrail(s => !s), description: 'Toggle trail' },
  ]);

  const handleSave = () => {
    if (!experimentName.trim()) {
      toast.error("Please enter a name for your experiment");
      return;
    }
    const experiment: SavedExperiment = {
      id: `exp-${Date.now()}`,
      name: experimentName,
      createdAt: new Date().toISOString(),
      config,
      initialState: { position: { x: 0, y: startHeight }, velocity: initialVelocity, mass },
      dataPoints: data.slice(-100).map(d => ({ time: d.time, position: d.positionY, velocity: d.velocityY })),
    };
    setSavedExperiments(prev => [...prev, experiment]);
    toast.success("Experiment saved!");
    setSaveDialogOpen(false);
    setExperimentName("");
  };

  const handleLoad = (experiment: SavedExperiment) => {
    setConfig(experiment.config);
    setStartHeight(experiment.initialState.position.y);
    setInitialVelocity(experiment.initialState.velocity);
    setMass(experiment.initialState.mass);
    reset();
    setLoadDialogOpen(false);
    toast.success(`Loaded: ${experiment.name}`);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-physics flex items-center justify-center">
                <Atom className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Physics Lab</h1>
                <p className="text-sm text-muted-foreground">Motion, gravity, and energy simulation</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 space-y-4">
              <Card className="glass-card overflow-hidden">
                <div className="h-[450px]">
                  <PhysicsSimulation state={state} config={config} showTrail={showTrail} showVectors={showVectors} isPlaying={isPlaying} />
                </div>
              </Card>
              <PhysicsGraphs data={data} />
            </div>
            <div className="space-y-4">
              <PhysicsReadouts state={state} />
              <PhysicsControls
                config={config} setConfig={setConfig}
                initialVelocity={initialVelocity} setInitialVelocity={setInitialVelocity}
                mass={mass} setMass={setMass}
                startHeight={startHeight} setStartHeight={setStartHeight}
                isPlaying={isPlaying} setIsPlaying={setIsPlaying}
                showTrail={showTrail} setShowTrail={setShowTrail}
                showVectors={showVectors} setShowVectors={setShowVectors}
                onReset={reset} onStep={step}
                onSave={() => setSaveDialogOpen(true)} onLoad={() => setLoadDialogOpen(true)}
                selectedPreset={selectedPreset} setSelectedPreset={setSelectedPreset}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Save Experiment</DialogTitle></DialogHeader>
          <Input placeholder="Experiment name" value={experimentName} onChange={(e) => setExperimentName(e.target.value)} />
          <Button onClick={handleSave}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Load Experiment</DialogTitle></DialogHeader>
          {savedExperiments.length === 0 ? (
            <p className="text-muted-foreground text-sm">No saved experiments</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedExperiments.map(exp => (
                <Button key={exp.id} variant="outline" className="w-full justify-start" onClick={() => handleLoad(exp)}>
                  {exp.name}
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PhysicsLab;
