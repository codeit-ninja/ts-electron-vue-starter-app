import { Client } from 'imdb-api';
import { MovieDb } from 'moviedb-promise';

export interface iMovieProviders {
    omdb: Client;
    tmdb: MovieDb;
}

export const providers: iMovieProviders = {
    omdb: new Client( { apiKey: 'b7eb1481' } ),
    tmdb: new MovieDb('787140aa5af99e2bab3428c0aab96e43'),
};

export const useProvider = ( name: keyof iMovieProviders ) => providers[name];