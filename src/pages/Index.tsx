
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentSlider } from "@/components/ContentSlider";
import { MOCK_CONTENT, CATEGORIES } from "@/lib/constants";
import { Content } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetch data
    const timer = setTimeout(() => {
      setFeaturedContent(MOCK_CONTENT[0]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filterContentByType = (type: string) => {
    if (type === 'trending') return MOCK_CONTENT;
    if (type === 'new') {
      // Simulate new releases (just sort by release year descending)
      return [...MOCK_CONTENT].sort((a, b) => b.releaseYear - a.releaseYear);
    }
    return MOCK_CONTENT.filter(content => content.type === type);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      {isLoading ? (
        <div className="h-[80vh] w-full bg-card/30 animate-pulse" />
      ) : (
        featuredContent && <Hero content={featuredContent} />
      )}
      
      {/* Content sections */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 flex-grow">
        {isLoading ? (
          <div className="space-y-12 pb-20">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-64 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8 pb-20">
            {CATEGORIES.map((category) => (
              <ContentSlider 
                key={category.id}
                title={category.name}
                contents={filterContentByType(category.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
