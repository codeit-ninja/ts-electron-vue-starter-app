import { isString } from 'lodash';
import { MovieImagesResponse } from 'moviedb-promise/dist/request-types';
import { onMounted, ref } from 'vue';
import { useService } from './service';

export function getPopularMovies() {
    const movieService = useService('MovieService');
    const populairMovies = ref<Movie[]>([]);

    onMounted( async () => {
        const response = await movieService.popularMovies();
        console.log(response);
        populairMovies.value = response
    })

    return { populairMovies }
}

export function getMovieImages( tmdbId: number ) {
    const movieService = useService('MovieService');
    const movieImages = ref<MovieImagesResponse>();

    onMounted( async () => {
        movieImages.value = await movieService.movieImages( tmdbId );

        console.log(movieImages.value);
    });

    return { movieImages };
}

export function getTopRatedMovies() {
    const movieService = useService('MovieService');
    const topRatedMovies = ref<Movie[]>([]);

    onMounted( async () => {
        const response = await movieService.topRatedMovies();
        console.log(response);
        topRatedMovies.value = response
    })

    return { topRatedMovies }
}

export const getYear = ( date: string ) => new Date(date).getFullYear();
export const getRating = (movie: Movie) => movie.imdb ? parseFloat(movie.imdb?.imdb_rating) : movie.vote_average || 0;
export const getGenres = (movie: Movie) => movie.imdb?.genre?.split(',');
export const getRuntime = (runtime: string|number|undefined) => {
    let total;

    if( ! runtime ) return runtime;

    if(isString(runtime)) {
        total = parseInt(runtime);
    } else {
        total = runtime;
    }

    const hours   = Math.floor(total / 60);
    const minutes = Math.floor(total % 60);

    return `${hours}h ${minutes}m`;
}