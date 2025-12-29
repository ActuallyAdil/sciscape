import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhysicsLab from "./pages/PhysicsLab";
import ChemistryLab from "./pages/ChemistryLab";
import BiologyExplorer from "./pages/BiologyExplorer";
import ConceptsPage from "./pages/ConceptsPage";
import NotebookPage from "./pages/NotebookPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/physics" element={<PhysicsLab />} />
          <Route path="/chemistry" element={<ChemistryLab />} />
          <Route path="/biology" element={<BiologyExplorer />} />
          <Route path="/concepts" element={<ConceptsPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
