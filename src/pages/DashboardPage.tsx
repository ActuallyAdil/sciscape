import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { LayoutDashboard, Flame, BookOpen, FlaskConical, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProgress, createInitialProgress, updateStreak } from "@/lib/progress-types";
import { CONCEPTS } from "@/lib/concepts-data";
import { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const DashboardPage = () => {
  const [progress, setProgress] = useLocalStorage<UserProgress>('user-progress', createInitialProgress());
  const [conceptProgress] = useLocalStorage<Record<string, string>>('concept-progress', {});
  const [notes] = useLocalStorage<any[]>('science-notes', []);
  const [experiments] = useLocalStorage<any[]>('physics-experiments', []);

  useEffect(() => {
    setProgress(prev => updateStreak(prev));
  }, []);

  const learnedCount = Object.values(conceptProgress).filter(s => s === 'learned').length;
  const inProgressCount = Object.values(conceptProgress).filter(s => s === 'in-progress').length;

  const conceptData = [
    { name: 'Learned', value: learnedCount, color: 'hsl(var(--chemistry))' },
    { name: 'In Progress', value: inProgressCount, color: 'hsl(var(--concept))' },
    { name: 'Not Started', value: CONCEPTS.length - learnedCount - inProgressCount, color: 'hsl(var(--muted))' },
  ];

  const subjectData = [
    { name: 'Physics', count: Object.entries(conceptProgress).filter(([id, s]) => s === 'learned' && CONCEPTS.find(c => c.id === id)?.subject === 'physics').length },
    { name: 'Chemistry', count: Object.entries(conceptProgress).filter(([id, s]) => s === 'learned' && CONCEPTS.find(c => c.id === id)?.subject === 'chemistry').length },
    { name: 'Biology', count: Object.entries(conceptProgress).filter(([id, s]) => s === 'learned' && CONCEPTS.find(c => c.id === id)?.subject === 'biology').length },
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Your learning progress</p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.streak.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chemistry/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-chemistry" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{learnedCount}</div>
                  <div className="text-xs text-muted-foreground">Concepts Learned</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-physics/20 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-physics" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{experiments.length}</div>
                  <div className="text-xs text-muted-foreground">Experiments Saved</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{notes.length}</div>
                  <div className="text-xs text-muted-foreground">Notes Created</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-4">Concept Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={conceptData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {conceptData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-4">By Subject</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectData}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
