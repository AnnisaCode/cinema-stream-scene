
export interface Content {
  id: string;
  title: string;
  description: string;
  posterPath: string;
  backdropPath: string;
  releaseYear: number;
  duration: string;
  type: 'movie' | 'anime' | 'series';
  genre: string[];
  rating: number;
}

export interface ApiConfig {
  key: string;
  name: string;
  isActive: boolean;
}

export type Theme = 'light' | 'dark';
