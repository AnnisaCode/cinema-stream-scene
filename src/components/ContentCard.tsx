
import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import { Content } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  content: Content;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const ContentCard = ({ 
  content, 
  size = "medium", 
  className 
}: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardSizes = {
    small: "w-[160px] h-[240px]",
    medium: "w-[200px] h-[300px]",
    large: "w-[240px] h-[360px]"
  };

  return (
    <Link 
      to={`/movie/${content.id}`}
      className={cn(
        "relative overflow-hidden rounded-lg hover-scale",
        cardSizes[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading placeholder */}
      <div className={cn(
        "absolute inset-0 bg-card animate-pulse",
        imageLoaded ? "opacity-0" : "opacity-100"
      )} />
      
      {/* Poster image */}
      <img 
        src={content.posterPath} 
        alt={content.title}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* Overlay gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-80"
      )} />
      
      {/* Content info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1.5">
        <h3 className="text-sm font-medium line-clamp-1">{content.title}</h3>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-primary text-primary" />
            <span>{content.rating}</span>
          </div>
          <span>•</span>
          <span>{content.releaseYear}</span>
          <span>•</span>
          <span className="capitalize">{content.type}</span>
        </div>
      </div>
      
      {/* Play button (visible on hover) */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <Play size={20} className="fill-white text-white ml-1" />
        </div>
      </div>
    </Link>
  );
};
