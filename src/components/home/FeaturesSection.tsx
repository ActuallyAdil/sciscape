import { motion } from "framer-motion";
import { 
  Sliders, 
  BarChart3, 
  RotateCcw, 
  Layers, 
  Network, 
  Zap,
  Save,
  Eye
} from "lucide-react";

const features = [
  {
    icon: Sliders,
    title: "Real-time Controls",
    description: "Adjust mass, force, temperature, and other variables with interactive sliders.",
  },
  {
    icon: BarChart3,
    title: "Live Graphs",
    description: "Watch data visualizations update in sync with your simulations.",
  },
  {
    icon: RotateCcw,
    title: "3D Manipulation",
    description: "Rotate, zoom, and explore 3D models from any angle.",
  },
  {
    icon: Layers,
    title: "Zoom Levels",
    description: "Go from macro to micro - organs to cells to molecules.",
  },
  {
    icon: Network,
    title: "Concept Connections",
    description: "See how all scientific concepts interconnect visually.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "See cause and effect immediately as you change parameters.",
  },
  {
    icon: Save,
    title: "Save Experiments",
    description: "Save your configurations and compare results side by side.",
  },
  {
    icon: Eye,
    title: "Step-by-Step Mode",
    description: "Slow down or step through complex processes frame by frame.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Science Without Limits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every tool you need to explore, experiment, and understand.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
