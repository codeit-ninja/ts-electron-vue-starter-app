import { reactive, Ref, ref } from "vue";

export const showMoviePopover = ref(false);
export const moviePopoverData = ref<Movie>() as unknown as Ref<Movie>;

export const store = reactive({
    showMoviePopover: false
});

export const moviePopover = reactive({
    visible: false,
    movie: {} as Movie
})