import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward,
  Eye,
  EyeOff,
  Save,
  Upload
} from "lucide-react";
import { PhysicsConfig, ENVIRONMENT_PRESETS } from "@/lib/physics-engine";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PhysicsControlsProps {
  config: PhysicsConfig;
  setConfig: (config: PhysicsConfig) => void;
  initialVelocity: { x: number; y: number };
  setInitialVelocity: (v: { x: number; y: number }) => void;
  mass: number;
  setMass: (m: number) => void;
  startHeight: number;
  setStartHeight: (h: number) => void;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  showTrail: boolean;
  setShowTrail: (s: boolean) => void;
  showVectors: boolean;
  setShowVectors: (s: boolean) => void;
  onReset: () => void;
  onStep: () => void;
  onSave: () => void;
  onLoad: () => void;
  selectedPreset: string;
  setSelectedPreset: (p: string) => void;
}

export const PhysicsControls = ({
  config,
  setConfig,
  initialVelocity,
  setInitialVelocity,
  mass,
  setMass,
  startHeight,
  setStartHeight,
  isPlaying,
  setIsPlaying,
  showTrail,
  setShowTrail,
  showVectors,
  setShowVectors,
  onReset,
  onStep,
  onSave,
  onLoad,
  selectedPreset,
  setSelectedPreset,
}: PhysicsControlsProps) => {
  
  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    const preset = ENVIRONMENT_PRESETS.find(p => p.name === presetName);
    if (preset && presetName !== 'Custom') {
      setConfig({ ...config, gravity: preset.gravity });
    }
  };

  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3 text-sm">Playback</h3>
        <div className="flex gap-2">
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button variant="outline" size="sm" onClick={onStep} disabled={isPlaying}>
            <StepForward className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Environment */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3 text-sm">Environment</h3>
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full mb-3">
            <SelectValue placeholder="Select environment" />
          </SelectTrigger>
          <SelectContent>
            {ENVIRONMENT_PRESETS.map((preset) => (
              <SelectItem key={preset.name} value={preset.name}>
                {preset.name} ({preset.gravity} m/s²)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Gravity</span>
              <span className="font-mono text-muted-foreground">{config.gravity.toFixed(1)} m/s²</span>
            </div>
            <Slider
              value={[config.gravity]}
              onValueChange={([v]) => {
                setConfig({ ...config, gravity: v });
                setSelectedPreset('Custom');
              }}
              min={0}
              max={30}
              step={0.1}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Bounciness</span>
              <span className="font-mono text-muted-foreground">{(config.bounciness * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[config.bounciness]}
              onValueChange={([v]) => setConfig({ ...config, bounciness: v })}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Air Resistance</span>
              <span className="font-mono text-muted-foreground">{config.airResistance.toFixed(3)}</span>
            </div>
            <Slider
              value={[config.airResistance]}
              onValueChange={([v]) => setConfig({ ...config, airResistance: v })}
              min={0}
              max={0.1}
              step={0.001}
            />
          </div>
        </div>
      </Card>

      {/* Initial Conditions */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3 text-sm">Initial Conditions</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Start Height</span>
              <span className="font-mono text-muted-foreground">{startHeight.toFixed(1)} m</span>
            </div>
            <Slider
              value={[startHeight]}
              onValueChange={([v]) => setStartHeight(v)}
              min={0.5}
              max={9}
              step={0.1}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Mass</span>
              <span className="font-mono text-muted-foreground">{mass.toFixed(1)} kg</span>
            </div>
            <Slider
              value={[mass]}
              onValueChange={([v]) => setMass(v)}
              min={0.1}
              max={10}
              step={0.1}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Initial Vx</span>
              <span className="font-mono text-muted-foreground">{initialVelocity.x.toFixed(1)} m/s</span>
            </div>
            <Slider
              value={[initialVelocity.x]}
              onValueChange={([v]) => setInitialVelocity({ ...initialVelocity, x: v })}
              min={-10}
              max={10}
              step={0.1}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Initial Vy</span>
              <span className="font-mono text-muted-foreground">{initialVelocity.y.toFixed(1)} m/s</span>
            </div>
            <Slider
              value={[initialVelocity.y]}
              onValueChange={([v]) => setInitialVelocity({ ...initialVelocity, y: v })}
              min={-15}
              max={15}
              step={0.1}
            />
          </div>
        </div>
      </Card>

      {/* Visualization */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3 text-sm">Visualization</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="trail" className="text-sm">Show Trail</Label>
            <Switch id="trail" checked={showTrail} onCheckedChange={setShowTrail} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="vectors" className="text-sm">Show Vectors</Label>
            <Switch id="vectors" checked={showVectors} onCheckedChange={setShowVectors} />
          </div>
        </div>
      </Card>

      {/* Save/Load */}
      <Card className="p-4 glass-card">
        <h3 className="font-semibold mb-3 text-sm">Experiments</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onSave}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onLoad}>
            <Upload className="w-4 h-4 mr-1" />
            Load
          </Button>
        </div>
      </Card>
    </div>
  );
};
