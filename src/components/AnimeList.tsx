import { useEffect, useState } from "react";

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
        <div>
            <h2>Top Anime</h2>
            <ul>
                {animeList.map(anime => (
                    <li key={anime.mal_id}>
                        <h3>{anime.title}</h3>
                        <img src={anime.images.jpg.image_url} alt={anime.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimeList; 