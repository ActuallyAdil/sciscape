import { Card } from "@/components/ui/card";
import { PhysicsState } from "@/lib/physics-engine";

interface PhysicsReadoutsProps {
  state: PhysicsState;
}

export const PhysicsReadouts = ({ state }: PhysicsReadoutsProps) => {
  const speed = Math.sqrt(state.velocity.x ** 2 + state.velocity.y ** 2);
  const kineticEnergy = 0.5 * state.mass * speed ** 2;
  const potentialEnergy = state.mass * 9.81 * Math.max(0, state.position.y);
  const totalEnergy = kineticEnergy + potentialEnergy;

  return (
    <Card className="p-4 glass-card">
      <h3 className="font-semibold mb-3 text-sm">Live Readouts</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">Time</div>
          <div className="font-mono text-lg">{state.time.toFixed(2)}s</div>
        </div>
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="font-mono text-lg">{state.position.y.toFixed(2)}m</div>
        </div>
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">X Position</div>
          <div className="font-mono text-lg">{state.position.x.toFixed(2)}m</div>
        </div>
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">Speed</div>
          <div className="font-mono text-lg">{speed.toFixed(2)}m/s</div>
        </div>
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">Velocity X</div>
          <div className="font-mono text-lg">{state.velocity.x.toFixed(2)}m/s</div>
        </div>
        <div className="p-2 rounded bg-muted/50">
          <div className="text-xs text-muted-foreground">Velocity Y</div>
          <div className="font-mono text-lg">{state.velocity.y.toFixed(2)}m/s</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-xs text-muted-foreground mb-2">Energy (J)</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Kinetic</span>
            <span className="font-mono text-sm text-physics">{kineticEnergy.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Potential</span>
            <span className="font-mono text-sm text-chemistry">{potentialEnergy.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <span className="text-sm">Total</span>
            <span className="font-mono text-sm">{totalEnergy.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
