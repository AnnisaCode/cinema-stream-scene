
import { useState, useEffect } from 'react';
import { Content } from '@/lib/types';
import { toast } from 'sonner';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Content[]>([]);
  
  useEffect(() => {
    // Load watchlist from localStorage on mount
    const storedWatchlist = localStorage.getItem('streamvibe-watchlist');
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist));
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage', error);
        localStorage.removeItem('streamvibe-watchlist');
      }
    }
  }, []);
  
  const addToWatchlist = (content: Content) => {
    const isAlreadyInWatchlist = watchlist.some(item => item.id === content.id);
    
    if (isAlreadyInWatchlist) {
      toast.error(`${content.title} is already in your watchlist`);
      return;
    }
    
    const newWatchlist = [...watchlist, content];
    setWatchlist(newWatchlist);
    localStorage.setItem('streamvibe-watchlist', JSON.stringify(newWatchlist));
    toast.success(`Added ${content.title} to your watchlist`);
  };
  
  const removeFromWatchlist = (contentId: string) => {
    const contentToRemove = watchlist.find(item => item.id === contentId);
    const newWatchlist = watchlist.filter(item => item.id !== contentId);
    setWatchlist(newWatchlist);
    localStorage.setItem('streamvibe-watchlist', JSON.stringify(newWatchlist));
    
    if (contentToRemove) {
      toast.success(`Removed ${contentToRemove.title} from your watchlist`);
    }
  };
  
  const isInWatchlist = (contentId: string) => {
    return watchlist.some(item => item.id === contentId);
  };
  
  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.removeItem('streamvibe-watchlist');
    toast.success('Watchlist cleared');
  };
  
  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist
  };
};
