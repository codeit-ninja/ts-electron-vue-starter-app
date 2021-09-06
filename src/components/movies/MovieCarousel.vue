<template class="movie-carousel">
    <Carousel :value="$props.movies" :responsiveOptions="responsiveOptions">
        <template #header>
            <h4>{{$props.title}}</h4>
        </template>
        <template #item="movie">
            <a href="#" class="movie-link" @click="MovieStore.openModal(movie.data)">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.data.backdrop_path}`" :alt="movie.data.title" class="img-fluid">
                <div class="overlay overlay-gradient d-flex flex-column h-100 w-100 justify-content-end">
                    <div class="title d-flex flex-column">
                        <span>{{movie.data.title}} ({{getYear(movie.data.release_date)}})</span>
                        <span><StarRating :rating="getRating(movie.data)" /></span>
                    </div>
                    <div class="genres d-flex mt-2">
                        <Chip v-for="genre in getGenres(movie.data)" :key="genre" :label="genre" />
                    </div>
                </div>
            </a>
        </template>
    </Carousel>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getYear, getRating, getGenres } from '@/composables';
import Carousel from 'primevue/carousel';
import StarRating from '../StarRating.vue';
import Chip from 'primevue/chip';
import MovieStore from '@/store/MovieStore'
import { useService } from '@/composables/service';

export default defineComponent({
    props: {
        movies: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const responsiveOptions = [
            {
				breakpoint: '3840px',
				numVisible: 8,
				numScroll: 8
			},
            {
				breakpoint: '3200px',
				numVisible: 7,
				numScroll: 7
			},
			{
				breakpoint: '2500px',
				numVisible: 6,
				numScroll: 6
			},
            {
				breakpoint: '1960px',
				numVisible: 5,
				numScroll: 5
			},
			{
				breakpoint: '1437px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '1000px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '520px',
				numVisible: 1,
				numScroll: 1
			}
		];

        return {
            responsiveOptions,
            MovieStore,
            getYear,
            getRating,
            getGenres,
        }
    },
    components: {
        Carousel,
        StarRating,
        Chip
    }
})
</script>