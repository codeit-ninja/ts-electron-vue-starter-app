import { Omdb } from "@/classes/Omdb";
import { Providers } from "@/classes/Providers";
import { snakeCase, transform } from "lodash";
import { MovieDb } from "moviedb-promise";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import { Genre, ProductionCompany, ProductionCountry, SpokenLanguage } from "moviedb-promise/dist/types";

export class Movie {    
    public adult!: boolean;

    public backdrop_path!: string;

    public belongs_to_collection?: object;

    public budget!: number;

    public genres!: Array<Genre>;

    public homepage!: string;

    public id!: number;

    public imdb_id!: string;

    public original_language!: string;

    public original_title?: string;

    public overview!: string;

    public popularity!: number;

    public poster_path!: string;

    public production_companies?: Array<ProductionCompany>;

    public production_countries?: Array<ProductionCountry>;

    public release_date!: string;

    public revenue?: number;

    public runtime!: number;

    public spoken_languages!: Array<SpokenLanguage>;

    public status!: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

    public tagline?: string;

    public title!: string;

    public video!: boolean;

    public vote_average!: number;

    public vote_count!: number;

    public imdb!: iImdbMovie;

    [name: string]: any;

    private constructor( movie: Movie ) {
        Object.keys(movie).forEach(key => this[key] = movie[key]);
    }

    /**
     * Get a movie from TMDb by TMDb movie ID
     * 
     * @param id 
     * @returns Movie[]
     */
    public static async getMovie( id: number ) {
        const movieTmdb = await Providers.getProvider<MovieDb>('tmdb').movieInfo( id );

        if( ! movieTmdb.imdb_id ) {
            throw new Error('This movie has no IMDb ID, which is required for the streaming service to run.');
        }

        const movieImdb = transform(await Providers.getProvider<Omdb>('omdb').getById(movieTmdb.imdb_id), (result: iImdbMovie, val, key ) => result[snakeCase(key)] = val);
        const movie = { ...movieTmdb as Required<MovieResponse>, imdb: movieImdb }

        return new Movie(movie)
    }
}