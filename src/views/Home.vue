<template>
  <MovieCarousel :movies="populairMovies" title="Currently popular" />
  <MovieCarousel :movies="topRatedMovies" title="Best rated" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MovieCarousel from '@/components/movies/MovieCarousel.vue'
import { getPopularMovies, getTopRatedMovies } from '@/composables';

export default defineComponent({
    setup() {
        const { populairMovies } = getPopularMovies();
        const { topRatedMovies } = getTopRatedMovies();

        return {
            populairMovies,
            topRatedMovies
        }
    },
    components: {
        MovieCarousel
    }
})
</script>