import { useEffect, useState } from "react";
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

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimeList = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/top/anime");
                const data = await response.json();

                // Log data yang diterima
                console.log('Anime data received:', data);

                setAnimeList(data.data); // Sesuaikan dengan struktur data yang diterima
                setLoading(false);
            } catch (error) {
                console.error('Error fetching anime:', error);
                setLoading(false);
            }
        };

        fetchAnimeList();
    }, []);

    if (loading) {
        console.log('Loading anime data...'); // Log status loading
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
                <h2 className="text-3xl font-bold mb-4">Top Anime</h2>
                <Separator className="mb-8" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {animeList.map(anime => (
                        <li key={anime.mal_id} className="glass-panel rounded-lg overflow-hidden">
                            <h3 className="font-semibold">{anime.title}</h3>
                            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full aspect-[2/3] object-cover" />
                        </li>
                    ))}
                </ul>
            </main>

            <Footer />
        </div>
    );
};

export default AnimeList; 