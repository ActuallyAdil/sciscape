import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, 
  FlaskConical, 
  Dna, 
  Network, 
  Menu, 
  X, 
  Moon, 
  Sun,
  BookOpen,
  LayoutDashboard,
  Keyboard
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const navItems = [
  { path: "/physics", label: "Physics", icon: Atom, color: "text-physics" },
  { path: "/chemistry", label: "Chemistry", icon: FlaskConical, color: "text-chemistry" },
  { path: "/biology", label: "Biology", icon: Dna, color: "text-biology" },
  { path: "/concepts", label: "Concepts", icon: Network, color: "text-concept" },
  { path: "/notebook", label: "Notebook", icon: BookOpen, color: "text-primary" },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-accent-foreground" },
];

const shortcuts = [
  { key: 'Space', description: 'Play/Pause simulation' },
  { key: 'R', description: 'Reset simulation' },
  { key: 'S', description: 'Step forward' },
  { key: 'T', description: 'Toggle trail' },
  { key: 'D', description: 'Toggle dark mode' },
  { key: '1-4', description: 'Switch between labs' },
];

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Atom className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-lg tracking-tight">SciScape</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? item.color : ""}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                    onClick={() => setShortcutsOpen(true)}
                  >
                    <Keyboard className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Keyboard shortcuts</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </TooltipContent>
              </Tooltip>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden py-4 border-t border-border overflow-hidden"
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
          </AnimatePresence>
        </div>
      </header>

      {/* Shortcuts Dialog */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">{shortcut.key}</kbd>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
