<template>
    <router-view />
    <Suspense v-if="MovieStore.state.modal">
        <template #default>
            <MovieModal/>
        </template>
        <template #fallback>
            Loading
        </template>
    </Suspense>
</template>
<script lang="ts">import { defineComponent, defineAsyncComponent } from "vue";
import MovieStore from './store/MovieStore';

export default defineComponent({
    components: {
        MovieModal: defineAsyncComponent(() => import('./components/movies/MovieModal.vue')),
    },
    data() {
        return {
            MovieStore
        }
    }
})
</script>