
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Content } from "@/lib/types";

interface HeroProps {
  content: Content;
}

export const Hero = ({ content }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = content.backdropPath;
    img.onload = () => setIsLoaded(true);
  }, [content.backdropPath]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
      
      {/* Background image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${content.backdropPath})` }}
      />
      
      {/* Content */}
      <div className="relative h-full container mx-auto flex flex-col justify-end pb-24 z-20">
        <div className="max-w-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            {content.genre.map((genre, index) => (
              <span 
                key={index} 
                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary animate-fade-in animate-delay-100"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold animate-fade-in animate-delay-200">
            {content.title}
          </h1>
          
          <p className="text-muted-foreground text-lg animate-fade-in animate-delay-300">
            {content.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 animate-fade-in animate-delay-400">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">{content.rating}/10</span>
              <span>{content.releaseYear}</span>
              <span>{content.duration}</span>
            </div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-4 animate-fade-in animate-delay-500">
            <Button className="rounded-full gap-2" size="lg">
              <Play size={18} className="fill-white" />
              <span>Play Now</span>
            </Button>
            
            <Link to={`/movie/${content.id}`}>
              <Button variant="outline" className="rounded-full gap-2" size="lg">
                <Info size={18} />
                <span>More Info</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

export default Hero;
