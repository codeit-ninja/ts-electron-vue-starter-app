import axios, { AxiosInstance } from "axios";

export interface iRequestParams {
    i?: string;
    t?: string;
    type?: 'movie'|'series'|'episode';
    y?: number;
    plot?: 'short'|'full';
    r?: 'json'|'xml';
    callback?: string;
    v?: number;
}

export interface iMovie {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: { Source: string, Value: string }[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: boolean;
}

export class Omdb {
    protected _axios: AxiosInstance;

    constructor( protected apiKey: string ) {
        this._axios = axios.create( { baseURL: 'https://www.omdbapi.com/', params: { apiKey: 'b7eb1481' } } );
    }

    public async getByTitle( title: string, params?: iRequestParams ) {
        return await this._axios.get<iMovie>('', { params: { t: title, ...params } });
    }

    public async getById( imdbId: string, params?: iRequestParams ) {
        return await (await this._axios.get<iMovie>('', { params: { i: imdbId, ...params } })).data;
    }
}