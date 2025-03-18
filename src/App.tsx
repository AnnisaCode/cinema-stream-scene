import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Watchlist from "./pages/Watchlist";
import AnimeList from "./components/AnimeList";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme from localStorage or user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('streamvibe-theme') || 'dark';
    document.documentElement.classList.add(savedTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/cinema-stream-scene/" element={<Index />} />
            <Route path="/cinema-stream-scene/movie/:id" element={<MovieDetail />} />
            <Route path="/cinema-stream-scene/settings" element={<Settings />} />
            <Route path="/cinema-stream-scene//watchlist" element={<Watchlist />} />
            <Route path="/cinema-stream-scene/anime" element={<AnimeList />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
