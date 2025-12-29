import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Atom, FlaskConical, Dna, Network, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/physics", label: "Physics Lab", icon: Atom, color: "physics" },
  { path: "/chemistry", label: "Chemistry Lab", icon: FlaskConical, color: "chemistry" },
  { path: "/biology", label: "Biology Explorer", icon: Dna, color: "biology" },
  { path: "/concepts", label: "Concept Graph", icon: Network, color: "concept" },
];

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Atom className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight">SciScape</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? `bg-${item.color}/10 text-${item.color}`
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-border"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </motion.nav>
        )}
      </div>
    </header>
  );
};
