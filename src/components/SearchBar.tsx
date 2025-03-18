
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@/lib/types";
import { MOCK_CONTENT } from "@/lib/constants";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filteredContent = MOCK_CONTENT.filter(content => 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filteredContent);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleItemClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
    toast.success("Movie found! Enjoy watching.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col">
      <div className="container mx-auto pt-24 px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for movies, anime, or TV series..."
              className="pl-10 py-6 bg-secondary text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2" 
                onClick={handleClear}
              >
                <X size={18} />
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        {/* Search results */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((item) => (
                <Link 
                  to={`/movie/${item.id}`} 
                  key={item.id}
                  onClick={handleItemClick}
                  className="glass-panel flex gap-4 p-3 rounded-lg hover:bg-primary/10 transition-all"
                >
                  <img 
                    src={item.posterPath} 
                    alt={item.title} 
                    className="w-16 h-24 object-cover rounded-md" 
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.genre.slice(0, 2).map((genre, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.releaseYear} • {item.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery.length > 1 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
