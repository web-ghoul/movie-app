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
  genres: { id: number; name: string }[];
  media_type: "movie" | "tv" | "person";
  original_language: string;
  runtime: number;
}

interface GenreTypes {
  id: number;
  name: string;
}

interface VideoTypes {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube" | string;
  size: number;
  type: "Trailer" | "Teaser" | "Featurette" | string;
  official: boolean;
  published_at: string;
  id: string;
}

interface ActorTypes {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export type { GenreTypes, MovieTypes, VideoTypes, ActorTypes };
