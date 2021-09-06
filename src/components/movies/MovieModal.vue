<template>
    <div class="b-modal">
        <header class="b-modal-header" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${MovieStore.state.current.backdrop_path})` }">
            
        </header>
        <div class="b-modal-content">
            <h1>{{MovieStore.state.current.title}}</h1>
            <div class="mb-4">
                <small><i class="pi pi-clock"></i> {{getRuntime(MovieStore.state.current.runtime)}}</small>
            </div>
            <Chip v-for="(genre, index) in MovieStore.state.current.genres" :label="genre.name" :key="`movie-detail-genre-${index}`" />
            <div class="mt-4">
                <h5 class="mb-3">Overview</h5>
                <p>{{MovieStore.state.current.overview}}</p>
            </div>
            <div class="mt-4">
                <h5 class="mb-3">Spoken languages</h5>
                <ul>
                    <li v-for="(lang, index) in MovieStore.state.current.spoken_languages" :key="`movie-detail-lang-${index}`">{{lang.name}} ({{lang.iso_639_1}})</li>
                </ul>
            </div>
            <div>
                <button @click="watch()">Watch</button>
                <video controls height="300" width="700" v-if="MovieStore.state.player">
                    <source src="http://localhost/video" type="video/mp4" />
                </video>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useService } from '@/composables/service';
import { defineComponent, ref } from 'vue'
import Chip from 'primevue/chip'
import { getRuntime, getYear } from '@/composables/movies'
import MovieStore from '@/store/MovieStore'

export default defineComponent({
    async setup() {
        const watch = async () => {
            const torrents = await useService('TorrentService').search(MovieStore.state.current.imdb_id);
            console.log(torrents);
            
            await useService('StreamingService').stream(torrents._4k[0].info_hash);

            MovieStore.state.player = true;
        }

        return {
            MovieStore,
            getRuntime,
            watch
        }
    },
    components: {
        Chip
    }
})
</script>