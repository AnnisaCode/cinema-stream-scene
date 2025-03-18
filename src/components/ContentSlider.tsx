
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ContentCard";
import { Content } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContentSliderProps {
  title: string;
  contents: Content[];
  className?: string;
}

export const ContentSlider = ({ title, contents, className }: ContentSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollAmount = 800;

  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollTo = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    
    const { scrollLeft } = sliderRef.current;
    const newPosition = direction === "left" 
      ? scrollLeft - scrollAmount 
      : scrollLeft + scrollAmount;
      
    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
  };

  return (
    <div className={cn("relative py-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      
      <div className="relative group">
        {/* Scroll buttons */}
        {showLeftButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scrollTo("left")}
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        
        {showRightButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scrollTo("right")}
          >
            <ChevronRight size={24} />
          </Button>
        )}
        
        {/* Content cards */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
};
