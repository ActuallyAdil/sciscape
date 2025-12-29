import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const elements = [
  { symbol: "H", name: "Hydrogen", number: 1, category: "nonmetal", mass: 1.008, group: 1, period: 1 },
  { symbol: "He", name: "Helium", number: 2, category: "noble-gas", mass: 4.003, group: 18, period: 1 },
  { symbol: "Li", name: "Lithium", number: 3, category: "alkali", mass: 6.94, group: 1, period: 2 },
  { symbol: "Be", name: "Beryllium", number: 4, category: "alkaline", mass: 9.012, group: 2, period: 2 },
  { symbol: "B", name: "Boron", number: 5, category: "metalloid", mass: 10.81, group: 13, period: 2 },
  { symbol: "C", name: "Carbon", number: 6, category: "nonmetal", mass: 12.01, group: 14, period: 2 },
  { symbol: "N", name: "Nitrogen", number: 7, category: "nonmetal", mass: 14.01, group: 15, period: 2 },
  { symbol: "O", name: "Oxygen", number: 8, category: "nonmetal", mass: 16.00, group: 16, period: 2 },
  { symbol: "F", name: "Fluorine", number: 9, category: "halogen", mass: 19.00, group: 17, period: 2 },
  { symbol: "Ne", name: "Neon", number: 10, category: "noble-gas", mass: 20.18, group: 18, period: 2 },
  { symbol: "Na", name: "Sodium", number: 11, category: "alkali", mass: 22.99, group: 1, period: 3 },
  { symbol: "Mg", name: "Magnesium", number: 12, category: "alkaline", mass: 24.31, group: 2, period: 3 },
  { symbol: "Al", name: "Aluminum", number: 13, category: "metal", mass: 26.98, group: 13, period: 3 },
  { symbol: "Si", name: "Silicon", number: 14, category: "metalloid", mass: 28.09, group: 14, period: 3 },
  { symbol: "P", name: "Phosphorus", number: 15, category: "nonmetal", mass: 30.97, group: 15, period: 3 },
  { symbol: "S", name: "Sulfur", number: 16, category: "nonmetal", mass: 32.07, group: 16, period: 3 },
  { symbol: "Cl", name: "Chlorine", number: 17, category: "halogen", mass: 35.45, group: 17, period: 3 },
  { symbol: "Ar", name: "Argon", number: 18, category: "noble-gas", mass: 39.95, group: 18, period: 3 },
];

const categoryColors: Record<string, string> = {
  "alkali": "bg-rose-500/80 hover:bg-rose-500",
  "alkaline": "bg-orange-500/80 hover:bg-orange-500",
  "metal": "bg-blue-500/80 hover:bg-blue-500",
  "metalloid": "bg-teal-500/80 hover:bg-teal-500",
  "nonmetal": "bg-green-500/80 hover:bg-green-500",
  "halogen": "bg-yellow-500/80 hover:bg-yellow-500",
  "noble-gas": "bg-purple-500/80 hover:bg-purple-500",
};

interface Element {
  symbol: string;
  name: string;
  number: number;
  category: string;
  mass: number;
  group: number;
  period: number;
}

export const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="grid gap-1 min-w-[600px]" style={{ gridTemplateColumns: "repeat(18, 1fr)" }}>
          {elements.map((element, index) => {
            const col = element.group;
            const row = element.period;

            return (
              <motion.button
                key={element.symbol}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square p-1 rounded-lg ${categoryColors[element.category]} text-primary-foreground flex flex-col items-center justify-center cursor-pointer transition-all shadow-md`}
                style={{ gridColumn: col, gridRow: row }}
                onClick={() => setSelectedElement(element)}
              >
                <span className="text-[8px] opacity-75">{element.number}</span>
                <span className="text-sm font-bold">{element.symbol}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded ${color}`} />
            <span className="text-xs text-muted-foreground capitalize">{category.replace("-", " ")}</span>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedElement} onOpenChange={() => setSelectedElement(null)}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg ${selectedElement ? categoryColors[selectedElement.category] : ""} flex items-center justify-center text-primary-foreground text-xl font-bold`}>
                {selectedElement?.symbol}
              </div>
              <div>
                <div className="text-2xl font-bold">{selectedElement?.name}</div>
                <div className="text-sm text-muted-foreground">Atomic Number: {selectedElement?.number}</div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Atomic Mass</div>
              <div className="text-xl font-mono">{selectedElement?.mass} u</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Category</div>
              <div className="text-xl capitalize">{selectedElement?.category.replace("-", " ")}</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Group</div>
              <div className="text-xl font-mono">{selectedElement?.group}</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Period</div>
              <div className="text-xl font-mono">{selectedElement?.period}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
