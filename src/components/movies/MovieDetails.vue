<template>
    test
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Sidebar from 'primevue/sidebar';
import { moviePopover } from '@/composables/store';
import { getMovieImages } from '@/composables/movies';

export default defineComponent({
    setup() {
        const { movieImages } = getMovieImages( moviePopover.movie.id );
        
        return {
            moviePopover,
            movieImages
        }
    },
    components: {
        Sidebar
    }
})
</script>