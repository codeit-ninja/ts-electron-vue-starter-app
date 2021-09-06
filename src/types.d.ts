
interface iMovie extends Required<MovieResult> {
    imdb: iImdbMovie;
}

type iImdbMovie = {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: { source: string; value: string; }[];
    metascore: string;
    imdb_rating: string;
    imdb_votes: string;
    imdb_id: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: boolean;
    [key: string]: any;
}

type Movie = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: object;
    budget: number;
    genres: Array<Genre>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies?: Array<ProductionCompany>;
    production_countries?: Array<ProductionCountry>;
    release_date: string;
    revenue?: number;
    runtime: number;
    spoken_languages: Array<SpokenLanguage>;
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    tagline?: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    imdb: iImdbMovie;
}

type Torrent = {
    "id": number;
    "name": string;
    "info_hash": string;
    "leechers": number;
    "seeders": number;
    "num_files": number;
    "size": number;
    "username": string;
    "added": number;
    "status": string;
    "category": number;
    "imdb": string;
}