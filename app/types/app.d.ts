interface MovieTypes {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
  media_type: "movie" | "tv" | "person";
  original_language: string;
}

interface GenreTypes {
  id: number;
  name: string;
}

export type { MovieTypes, GenreTypes };
