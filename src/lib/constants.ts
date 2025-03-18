
import { Content } from "./types";

export const MOCK_CONTENT: Content[] = [
  {
    id: "1",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterPath: "https://images.unsplash.com/photo-1613051813589-189401160f6a?q=80&w=2070&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
    releaseYear: 2014,
    duration: "2h 49m",
    type: "movie",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.6
  },
  {
    id: "2",
    title: "Demon Slayer",
    description: "A boy finds his family slaughtered and his sister turned into a demon. He vows to avenge his family and cure his sister.",
    posterPath: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1887&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=2070&auto=format&fit=crop",
    releaseYear: 2019,
    duration: "26 episodes",
    type: "anime",
    genre: ["Action", "Fantasy", "Adventure"],
    rating: 8.7
  },
  {
    id: "3",
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family trying to avenge his father's death.",
    posterPath: "https://images.unsplash.com/photo-1547700055-b61cacebece9?q=80&w=2070&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1499343162160-cd1441923dd4?q=80&w=2070&auto=format&fit=crop",
    releaseYear: 2021,
    duration: "2h 35m",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    rating: 8.1
  },
  {
    id: "4",
    title: "Attack on Titan",
    description: "Humans must survive in a world dominated by giant humanoid Titans who devour them without reason.",
    posterPath: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=2070&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
    releaseYear: 2013,
    duration: "4 seasons",
    type: "anime",
    genre: ["Action", "Fantasy", "Drama"],
    rating: 9.0
  },
  {
    id: "5",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterPath: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1887&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    releaseYear: 2010,
    duration: "2h 28m",
    type: "movie",
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8
  },
  {
    id: "6",
    title: "One Piece",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.",
    posterPath: "https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
    releaseYear: 1999,
    duration: "1000+ episodes",
    type: "anime",
    genre: ["Adventure", "Comedy", "Fantasy"],
    rating: 8.9
  }
];

export const CATEGORIES = [
  { id: "trending", name: "Trending Now" },
  { id: "movies", name: "Movies" },
  { id: "anime", name: "Anime" },
  { id: "series", name: "TV Series" },
  { id: "new", name: "New Releases" }
];

export const DEFAULT_TRANSITION = { duration: 0.3, ease: [0.23, 1, 0.32, 1] };
