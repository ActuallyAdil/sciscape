import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataPoint {
  time: number;
  positionY: number;
  positionX: number;
  velocityY: number;
  velocityX: number;
  speed: number;
}

interface PhysicsGraphsProps {
  data: DataPoint[];
}

export const PhysicsGraphs = ({ data }: PhysicsGraphsProps) => {
  const displayData = data.slice(-150);

  return (
    <Card className="p-4 glass-card h-full">
      <Tabs defaultValue="position" className="h-full flex flex-col">
        <TabsList className="mb-2">
          <TabsTrigger value="position" className="text-xs">Position</TabsTrigger>
          <TabsTrigger value="velocity" className="text-xs">Velocity</TabsTrigger>
          <TabsTrigger value="combined" className="text-xs">Combined</TabsTrigger>
        </TabsList>

        <TabsContent value="position" className="flex-1 mt-0">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  fontSize={10} 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="positionY"
                  name="Height (m)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="positionX"
                  name="X Position (m)"
                  stroke="hsl(var(--chemistry))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="velocity" className="flex-1 mt-0">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  fontSize={10} 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="velocityY"
                  name="Vy (m/s)"
                  stroke="hsl(var(--biology))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="velocityX"
                  name="Vx (m/s)"
                  stroke="hsl(var(--concept))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="combined" className="flex-1 mt-0">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  fontSize={10} 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="positionY"
                  name="Height"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="speed"
                  name="Speed"
                  stroke="hsl(var(--biology))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
