import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { BookOpen, Plus, Trash2, Download, Link as LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Note, createNote } from "@/lib/notebook-types";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const NotebookPage = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('science-notes', []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const activeNote = notes.find(n => n.id === activeId);

  const addNote = () => {
    const newNote = createNote('New Note');
    setNotes(prev => [newNote, ...prev]);
    setActiveId(newNote.id);
    setIsEditing(true);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeId === id) setActiveId(null);
    toast.success("Note deleted");
  };

  const exportNote = (note: Note) => {
    const content = `# ${note.title}\n\n${note.content}\n\n---\nCreated: ${new Date(note.createdAt).toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/\s+/g, '-')}.md`;
    a.click();
    toast.success("Note exported");
  };

  return (
    <Layout>
      <div className="min-h-screen pt-6 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Science Notebook</h1>
                  <p className="text-sm text-muted-foreground">Your personal study notes</p>
                </div>
              </div>
              <Button onClick={addNote}><Plus className="w-4 h-4 mr-2" />New Note</Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              {notes.length === 0 ? (
                <Card className="p-8 glass-card text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No notes yet. Create your first note!</p>
                </Card>
              ) : (
                notes.map(note => (
                  <Card key={note.id} className={`p-3 glass-card cursor-pointer transition-all ${activeId === note.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`} onClick={() => { setActiveId(note.id); setIsEditing(false); }}>
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{note.content.slice(0, 50) || 'Empty note'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(note.updatedAt).toLocaleDateString()}</p>
                  </Card>
                ))
              )}
            </div>

            <div className="lg:col-span-2">
              {activeNote ? (
                <Card className="p-6 glass-card h-full">
                  <div className="flex items-center justify-between mb-4">
                    {isEditing ? (
                      <Input value={activeNote.title} onChange={(e) => updateNote(activeNote.id, { title: e.target.value })} className="text-xl font-bold" />
                    ) : (
                      <h2 className="text-xl font-bold">{activeNote.title}</h2>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Preview' : 'Edit'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportNote(activeNote)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteNote(activeNote.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {isEditing ? (
                    <Textarea value={activeNote.content} onChange={(e) => updateNote(activeNote.id, { content: e.target.value })} placeholder="Write your notes in Markdown..." className="min-h-[400px] font-mono text-sm" />
                  ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{activeNote.content || '*Start writing...*'}</ReactMarkdown>
                    </div>
                  )}
                </Card>
              ) : (
                <Card className="p-12 glass-card h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Select a note or create a new one</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotebookPage;
