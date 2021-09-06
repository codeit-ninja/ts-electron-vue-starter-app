import { Providers } from '@/classes/Providers';
import { Movie } from '@/models/Movie';
import { MovieDb } from 'moviedb-promise';

export class MovieService {
    /**
     * Returns a list of currently popular movies
     * 
     * @public
     * @returns iMovieListResponse[]
     */
    public async popularMovies() {
        const result = await Providers.getProvider<MovieDb>('tmdb').moviePopular();
        const movies: Movie[] = [];

        if( ! result.results ) return [];

        /**
         * Transform result into a full detailed movie object
         * which meets the Movie model
         */
        await Promise.all(result.results.map(async movie => movie.id && movies.push(await Movie.getMovie( movie.id ))));

        return movies;
    }

    /**
     * Returns a list of top rated movies
     * 
     * @public
     * @returns iMovieListResponse[]
     */
    public async topRatedMovies() {
        const result = await Providers.getProvider<MovieDb>('tmdb').movieTopRated();
        const movies: Movie[] = [];

        if( ! result.results ) return [];

        /**
         * Transform result into a full detailed movie object
         * which meets the Movie model
         */
        await Promise.all(result.results.map(async movie => movie.id && movies.push(await Movie.getMovie( movie.id ))));

        return movies;
    }

    /**
     * Returns a list of images
     * 
     * @public
     * @param tmdbId 
     * @returns MovieImagesResponse
     */
    public async movieImages( tmdbId: number ) {
        return await Providers.getProvider<MovieDb>('tmdb').movieImages( tmdbId );
    }

    /**
     * Returns movie details
     * 
     * @public
     * @param tmdbId 
     * @returns Movie
     */
    public async movieDetails( tmdbId: number ) {
        return await Movie.getMovie( tmdbId );
    }
}