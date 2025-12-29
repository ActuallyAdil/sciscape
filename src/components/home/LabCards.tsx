import { motion } from "framer-motion";
import { Atom, FlaskConical, Dna, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const labs = [
  {
    id: "physics",
    title: "Physics Lab",
    description: "Explore motion, forces, waves, and electromagnetism through real-time 3D simulations with adjustable variables.",
    icon: Atom,
    path: "/physics",
    gradient: "from-physics to-physics-glow",
    features: ["Motion & Forces", "Wave Mechanics", "Electricity & Magnetism", "Real-time Graphing"],
  },
  {
    id: "chemistry",
    title: "Chemistry Lab",
    description: "Visualize molecular structures, run virtual reactions, and explore the periodic table in 3D.",
    icon: FlaskConical,
    path: "/chemistry",
    gradient: "from-chemistry to-chemistry-glow",
    features: ["3D Molecules", "Reaction Simulator", "Interactive Periodic Table", "Bond Visualizer"],
  },
  {
    id: "biology",
    title: "Biology Explorer",
    description: "Dive into life sciences with interactive anatomy, cellular processes, and ecosystem simulations.",
    icon: Dna,
    path: "/biology",
    gradient: "from-biology to-biology-glow",
    features: ["3D Anatomy", "Cell Biology", "DNA Replication", "Ecosystem Builder"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const LabCards = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Laboratory</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each lab offers hands-on experiments, real-time simulations, and interactive learning experiences.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {labs.map((lab) => (
            <motion.div key={lab.id} variants={item}>
              <Link to={lab.path}>
                <div className="group relative h-full glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${lab.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center mb-6`}>
                    <lab.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{lab.title}</h3>
                  <p className="text-muted-foreground mb-6">{lab.description}</p>

                  <ul className="space-y-2 mb-6">
                    {lab.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${lab.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Enter Lab
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
