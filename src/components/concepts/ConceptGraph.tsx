import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  // Physics
  { id: "motion", label: "Motion", category: "physics", x: 15, y: 30 },
  { id: "forces", label: "Forces", category: "physics", x: 25, y: 20 },
  { id: "energy", label: "Energy", category: "physics", x: 35, y: 35 },
  { id: "waves", label: "Waves", category: "physics", x: 20, y: 45 },
  { id: "electricity", label: "Electricity", category: "physics", x: 10, y: 50 },
  
  // Chemistry
  { id: "atoms", label: "Atoms", category: "chemistry", x: 50, y: 25 },
  { id: "bonds", label: "Chemical Bonds", category: "chemistry", x: 60, y: 15 },
  { id: "reactions", label: "Reactions", category: "chemistry", x: 55, y: 40 },
  { id: "thermo", label: "Thermodynamics", category: "chemistry", x: 45, y: 50 },
  
  // Biology
  { id: "cells", label: "Cells", category: "biology", x: 75, y: 30 },
  { id: "dna", label: "DNA", category: "biology", x: 85, y: 20 },
  { id: "metabolism", label: "Metabolism", category: "biology", x: 80, y: 45 },
  { id: "ecology", label: "Ecology", category: "biology", x: 70, y: 55 },
];

const connections = [
  { from: "motion", to: "forces" },
  { from: "forces", to: "energy" },
  { from: "energy", to: "waves" },
  { from: "waves", to: "electricity" },
  { from: "energy", to: "thermo" },
  { from: "atoms", to: "bonds" },
  { from: "bonds", to: "reactions" },
  { from: "reactions", to: "thermo" },
  { from: "thermo", to: "metabolism" },
  { from: "atoms", to: "cells" },
  { from: "cells", to: "dna" },
  { from: "dna", to: "metabolism" },
  { from: "metabolism", to: "ecology" },
  { from: "energy", to: "metabolism" },
];

const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  physics: { bg: "bg-physics", text: "text-primary-foreground", glow: "shadow-[0_0_20px_hsl(var(--physics)/0.5)]" },
  chemistry: { bg: "bg-chemistry", text: "text-primary-foreground", glow: "shadow-[0_0_20px_hsl(var(--chemistry)/0.5)]" },
  biology: { bg: "bg-biology", text: "text-primary-foreground", glow: "shadow-[0_0_20px_hsl(var(--biology)/0.5)]" },
};

export const ConceptGraph = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodePosition = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    return connections.some(
      c => (c.from === hoveredNode && c.to === nodeId) || (c.to === hoveredNode && c.from === nodeId)
    );
  };

  return (
    <div className="relative w-full h-[500px] bg-card rounded-2xl border border-border overflow-hidden">
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => {
          const from = getNodePosition(connection.from);
          const to = getNodePosition(connection.to);
          const isActive = hoveredNode === connection.from || hoveredNode === connection.to;
          
          return (
            <motion.line
              key={index}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const colors = categoryColors[node.category];
        const isActive = hoveredNode === node.id || isConnected(node.id);

        return (
          <motion.button
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full ${colors.bg} ${colors.text} font-medium text-sm transition-all ${isActive ? colors.glow : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(node.id)}
          >
            {node.label}
          </motion.button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4">
        {Object.entries(categoryColors).map(([category, colors]) => (
          <div key={category} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
            <span className="text-xs text-muted-foreground capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
