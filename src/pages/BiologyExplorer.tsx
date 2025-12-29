import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Dna, HelpCircle, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ORGANELLES, BODY_SYSTEMS, QUIZ_QUESTIONS, Organelle } from "@/lib/biology-data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BiologyExplorer = () => {
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle | null>(null);
  const [selectedSystem, setSelectedSystem] = useState("skeletal");
  const [showLabels, setShowLabels] = useState(true);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const cellQuestions = QUIZ_QUESTIONS.filter(q => q.subject === 'cell');
  const question = quizMode ? cellQuestions[currentQuestion] : null;

  const handleOrganelleClick = (organelle: Organelle) => {
    if (quizMode && question) {
      if (organelle.id === question.targetId) {
        setScore(s => s + 1);
        toast.success("Correct!");
        if (currentQuestion < cellQuestions.length - 1) {
          setCurrentQuestion(c => c + 1);
        } else {
          toast.success(`Quiz complete! Score: ${score + 1}/${cellQuestions.length}`);
          setQuizMode(false);
          setCurrentQuestion(0);
          setScore(0);
        }
      } else {
        toast.error("Try again!");
      }
    } else {
      setSelectedOrganelle(organelle);
    }
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOrganelle(null);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-biology flex items-center justify-center">
                <Dna className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Biology Explorer</h1>
                <p className="text-sm text-muted-foreground">Cells, systems, and life processes</p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="cell" className="space-y-4">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="cell">Cell Structure</TabsTrigger>
              <TabsTrigger value="body">Body Systems</TabsTrigger>
            </TabsList>

            <TabsContent value="cell">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Card className="glass-card p-6">
                    {quizMode && question && (
                      <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <HelpCircle className="w-4 h-4" />
                          {question.question}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Hint: {question.hint}</p>
                      </div>
                    )}
                    <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg overflow-hidden">
                      {/* Interactive cell visualization */}
                      <svg viewBox="0 0 400 300" className="w-full h-full">
                        {/* Cell membrane */}
                        <ellipse cx="200" cy="150" rx="180" ry="130" fill="none" stroke="hsl(var(--biology))" strokeWidth="4" opacity="0.5" className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'membrane')!)} />
                        {/* Cytoplasm background */}
                        <ellipse cx="200" cy="150" rx="175" ry="125" fill="hsl(var(--muted))" opacity="0.3" />
                        {/* Nucleus */}
                        <circle cx="200" cy="140" r="50" fill="hsl(var(--primary))" opacity="0.8" className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'nucleus')!)} />
                        {showLabels && <text x="200" y="145" textAnchor="middle" fill="white" fontSize="12">Nucleus</text>}
                        {/* ER */}
                        <path d="M 100 100 Q 120 80 140 100 Q 160 120 140 140 Q 120 160 100 140" fill="none" stroke="#3b82f6" strokeWidth="3" className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'er')!)} />
                        {showLabels && <text x="120" y="175" textAnchor="middle" fill="currentColor" fontSize="10">ER</text>}
                        {/* Mitochondria */}
                        {[[290, 100], [80, 200], [300, 200]].map(([x, y], i) => (
                          <g key={i} className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'mitochondria')!)}>
                            <ellipse cx={x} cy={y} rx="25" ry="12" fill="#22c55e" opacity="0.8" />
                            {showLabels && i === 0 && <text x={x} y={y + 25} textAnchor="middle" fill="currentColor" fontSize="10">Mitochondria</text>}
                          </g>
                        ))}
                        {/* Ribosomes */}
                        {[[150, 90], [170, 200], [250, 220], [320, 140], [100, 130]].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="6" fill="#f59e0b" className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'ribosome')!)} />
                        ))}
                        {showLabels && <text x="150" y="75" textAnchor="middle" fill="currentColor" fontSize="10">Ribosomes</text>}
                        {/* Golgi */}
                        <g className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleOrganelleClick(ORGANELLES.find(o => o.id === 'golgi')!)}>
                          {[0, 8, 16].map((offset) => (
                            <path key={offset} d={`M 270 ${180 + offset} Q 290 ${175 + offset} 310 ${180 + offset}`} fill="none" stroke="#ec4899" strokeWidth="4" />
                          ))}
                          {showLabels && <text x="290" y="215" textAnchor="middle" fill="currentColor" fontSize="10">Golgi</text>}
                        </g>
                      </svg>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="labels">Show Labels</Label>
                        <Switch id="labels" checked={showLabels} onCheckedChange={setShowLabels} disabled={quizMode} />
                      </div>
                      <Button variant={quizMode ? "destructive" : "default"} size="sm" onClick={quizMode ? () => setQuizMode(false) : startQuiz}>
                        {quizMode ? "Exit Quiz" : "Start Quiz"}
                      </Button>
                    </div>
                  </Card>
                </div>
                <div>
                  <Card className="p-4 glass-card">
                    <h3 className="font-semibold mb-3">{selectedOrganelle ? selectedOrganelle.name : "Select an Organelle"}</h3>
                    {selectedOrganelle ? (
                      <div className="space-y-3 text-sm">
                        <p>{selectedOrganelle.description}</p>
                        <div>
                          <span className="font-medium">Function:</span>
                          <p className="text-muted-foreground">{selectedOrganelle.function}</p>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <span className="font-medium">Fun Fact:</span>
                          <p className="text-muted-foreground text-xs mt-1">{selectedOrganelle.funFact}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Click on any part of the cell to learn more about it.</p>
                    )}
                  </Card>
                  <Card className="p-4 glass-card mt-4">
                    <h3 className="font-semibold mb-3">Organelles</h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {ORGANELLES.map(org => (
                        <Button key={org.id} variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSelectedOrganelle(org)}>
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: org.color }} />
                          {org.name}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="body">
              <div className="grid lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 p-6 glass-card">
                  <div className="flex gap-2 mb-4">
                    {BODY_SYSTEMS.map(sys => (
                      <Button key={sys.id} variant={selectedSystem === sys.id ? "default" : "outline"} size="sm" onClick={() => setSelectedSystem(sys.id)}>
                        {sys.name.split(' ')[0]}
                      </Button>
                    ))}
                  </div>
                  <div className="aspect-[3/4] max-h-[500px] bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">{selectedSystem === 'skeletal' ? '🦴' : selectedSystem === 'circulatory' ? '❤️' : '🧠'}</div>
                      <h3 className="text-xl font-semibold">{BODY_SYSTEMS.find(s => s.id === selectedSystem)?.name}</h3>
                      <p className="text-muted-foreground mt-2">{BODY_SYSTEMS.find(s => s.id === selectedSystem)?.description}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 glass-card">
                  <h3 className="font-semibold mb-3">Organs</h3>
                  <div className="space-y-2">
                    {BODY_SYSTEMS.find(s => s.id === selectedSystem)?.organs.map(organ => (
                      <div key={organ.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                        <h4 className="font-medium text-sm">{organ.name}</h4>
                        <p className="text-xs text-muted-foreground">{organ.function}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default BiologyExplorer;
