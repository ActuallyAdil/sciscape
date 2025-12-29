import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Network, Search, Filter, CheckCircle, Circle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONCEPTS, Concept, ConceptStatus, Subject } from "@/lib/concepts-data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const statusIcons = {
  'not-started': Circle,
  'in-progress': Clock,
  'learned': CheckCircle,
};

const statusColors = {
  'not-started': 'text-muted-foreground',
  'in-progress': 'text-concept',
  'learned': 'text-chemistry',
};

const subjectColors: Record<Subject, string> = {
  physics: 'bg-physics',
  chemistry: 'bg-chemistry',
  biology: 'bg-biology',
};

const ConceptsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Subject | 'all'>('all');
  const [progress, setProgress] = useLocalStorage<Record<string, ConceptStatus>>('concept-progress', {});
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  const filteredConcepts = useMemo(() => {
    return CONCEPTS.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || c.subject === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const getStatus = (id: string): ConceptStatus => progress[id] || 'not-started';

  const cycleStatus = (id: string) => {
    const current = getStatus(id);
    const next: ConceptStatus = current === 'not-started' ? 'in-progress' : current === 'in-progress' ? 'learned' : 'not-started';
    setProgress(prev => ({ ...prev, [id]: next }));
  };

  const stats = {
    total: CONCEPTS.length,
    learned: Object.values(progress).filter(s => s === 'learned').length,
    inProgress: Object.values(progress).filter(s => s === 'in-progress').length,
  };

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-concept flex items-center justify-center">
                  <Network className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Concept Graph</h1>
                  <p className="text-sm text-muted-foreground">Track your learning journey</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-chemistry">{stats.learned}/{stats.total}</div>
                <div className="text-xs text-muted-foreground">concepts learned</div>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search concepts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="flex gap-1">
              {(['all', 'physics', 'chemistry', 'biology'] as const).map(s => (
                <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)} className="capitalize">
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConcepts.map((concept, i) => {
              const status = getStatus(concept.id);
              const StatusIcon = statusIcons[status];
              return (
                <motion.div key={concept.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Card className="p-4 glass-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedConcept(concept)}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${subjectColors[concept.subject]}`} />
                        <h3 className="font-semibold">{concept.name}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); cycleStatus(concept.id); }}>
                        <StatusIcon className={`w-4 h-4 ${statusColors[status]}`} />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{concept.description}</p>
                    <div className="flex gap-1 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${subjectColors[concept.subject]} text-primary-foreground capitalize`}>
                        {concept.subject}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted capitalize">{concept.difficulty}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedConcept} onOpenChange={() => setSelectedConcept(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${selectedConcept ? subjectColors[selectedConcept.subject] : ''}`} />
              {selectedConcept?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedConcept && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedConcept.description}</p>
              <div>
                <h4 className="font-medium mb-2">Key Points</h4>
                <ul className="space-y-1">
                  {selectedConcept.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>{point}
                    </li>
                  ))}
                </ul>
              </div>
              {selectedConcept.prerequisites.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Prerequisites</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedConcept.prerequisites.map(p => (
                      <span key={p} className="text-xs px-2 py-1 bg-muted rounded-full">{CONCEPTS.find(c => c.id === p)?.name}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedConcept.labLink && (
                <Link to={selectedConcept.labLink}>
                  <Button className="w-full">Open in Lab</Button>
                </Link>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ConceptsPage;
