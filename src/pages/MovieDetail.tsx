
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Play,
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Plus,
  Share2,
  ThumbsUp,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ContentSlider } from "@/components/ContentSlider";
import { MOCK_CONTENT } from "@/lib/constants";
import { Content } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    // Reset state when id changes
    setContent(null);
    setIsLoading(true);
    setImageLoaded(false);

    // Simulate loading and fetch content by ID
    const timer = setTimeout(() => {
      const foundContent = MOCK_CONTENT.find(item => item.id === id) || MOCK_CONTENT[0];
      setContent(foundContent);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleWatchlistToggle = () => {
    if (!content) return;

    if (isInWatchlist(content.id)) {
      removeFromWatchlist(content.id);
    } else {
      addToWatchlist(content);
    }
  };

  const handleShare = () => {
    if (navigator.share && content) {
      navigator.share({
        title: content.title,
        text: `Check out ${content.title} on StreamVibe!`,
        url: window.location.href,
      })
        .catch(() => {
          // If Web Share API fails or isn't supported, copy to clipboard
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard!");
        });
    } else if (content) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero section with backdrop */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent z-10" />

        {/* Background image or loading skeleton */}
        {isLoading ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: content ? `url(${content.backdropPath})` : "none" }}
          >
            {content && (
              <img
                src={content.backdropPath}
                alt=""
                className="hidden"
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
        )}

        {/* Back button */}
        <div className="absolute top-20 left-4 z-20">
          <Link to="/cinema-stream-scene/">
            <Button variant="ghost" size="icon" className="rounded-full bg-card/30 backdrop-blur-sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>

        {/* Content details */}
        <div className="relative h-full container mx-auto flex items-center z-20 pt-16">
          {isLoading ? (
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-center w-full">
              <Skeleton className="hidden md:block w-[300px] h-[450px] rounded-xl" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32 rounded-full" />
                  <Skeleton className="h-12 w-32 rounded-full" />
                </div>
              </div>
            </div>
          ) : content ? (
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-center">
              {/* Poster */}
              <div className="hidden md:block relative w-[300px] h-[450px] rounded-xl overflow-hidden glass-card hover-scale">
                <img
                  src={content.posterPath}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6 space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {content.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-bold">{content.title}</h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-primary text-primary" />
                      <span className="font-medium">{content.rating}/10</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{content.releaseYear}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{content.duration}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="capitalize">{content.type}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{content.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full gap-2">
                    <Play size={18} className="fill-white" />
                    <span>Play Now</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2"
                    onClick={handleWatchlistToggle}
                  >
                    {isInWatchlist(content.id) ? (
                      <>
                        <BookmarkCheck size={18} className="text-primary" />
                        <span>In Watchlist</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={18} />
                        <span>Add to Watchlist</span>
                      </>
                    )}
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ThumbsUp size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleShare}
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Similar content */}
      <div className="container mx-auto px-4 py-12 space-y-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          </div>
        ) : content ? (
          <ContentSlider
            title="You May Also Like"
            contents={MOCK_CONTENT.filter(
              item => item.type === content.type && item.id !== content.id
            )}
          />
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
