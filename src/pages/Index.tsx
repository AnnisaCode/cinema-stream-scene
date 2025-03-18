
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentSlider } from "@/components/ContentSlider";
import { MOCK_CONTENT, CATEGORIES } from "@/lib/constants";
import { Content } from "@/lib/types";

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
    return MOCK_CONTENT.filter(content => content.type === type);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      {isLoading ? (
        <div className="h-[80vh] w-full bg-card/30 animate-pulse" />
      ) : (
        featuredContent && <Hero content={featuredContent} />
      )}
      
      {/* Content sections */}
      <div className="container mx-auto px-4 -mt-16 pb-20 space-y-8 relative z-20">
        {CATEGORIES.map((category) => (
          <ContentSlider 
            key={category.id}
            title={category.name}
            contents={filterContentByType(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
