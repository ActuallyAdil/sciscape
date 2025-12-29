import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Pause, Play } from "lucide-react";

interface ControlPanelProps {
  gravity: number;
  setGravity: (value: number) => void;
  bounciness: number;
  setBounciness: (value: number) => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
  onReset: () => void;
}

export const ControlPanel = ({
  gravity,
  setGravity,
  bounciness,
  setBounciness,
  isPaused,
  setIsPaused,
  onReset,
}: ControlPanelProps) => {
  return (
    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-6 text-lg">Simulation Controls</h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium">Gravity</label>
            <span className="text-sm text-muted-foreground font-mono">
              {gravity.toFixed(1)} m/s²
            </span>
          </div>
          <Slider
            value={[gravity]}
            onValueChange={([v]) => setGravity(v)}
            min={0}
            max={20}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Moon (1.6)</span>
            <span>Earth (9.8)</span>
            <span>Jupiter (24.8)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium">Bounciness</label>
            <span className="text-sm text-muted-foreground font-mono">
              {(bounciness * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            value={[bounciness]}
            onValueChange={([v]) => setBounciness(v)}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Clay</span>
            <span>Rubber</span>
            <span>Super Ball</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
