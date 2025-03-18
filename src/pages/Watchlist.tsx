
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Film, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2">
            <List className="text-primary" size={24} />
            <h1 className="text-3xl font-bold">My Watchlist</h1>
          </div>

          {watchlist.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2" size={16} />
                  Clear Watchlist
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear your watchlist?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove all items from your watchlist.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearWatchlist}>
                    Clear
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <Separator className="mb-8" />

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((content) => (
              <div key={content.id} className="glass-panel rounded-lg overflow-hidden group">
                <div className="relative">
                  <Link to={`/cinema-stream-scene/movie/${content.id}`}>
                    <img
                      src={content.posterPath}
                      alt={content.title}
                      className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWatchlist(content.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="p-4">
                  <Link to={`/cinema-stream-scene/movie/${content.id}`}>
                    <h3 className="font-semibold truncate hover:text-primary transition-colors">
                      {content.title}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {content.releaseYear} • {content.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      <Film size={12} />
                      <span>{content.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-lg">
            <Film size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and add your favorite movies and shows
            </p>
            <Button asChild>
              <Link to="/cinema-stream-scene/">Browse Content</Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Watchlist;
