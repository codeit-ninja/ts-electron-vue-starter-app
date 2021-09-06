import Store from "@/store/Store";

export default new class MovieStore extends Store<MovieStore> {
    public current!: Movie;

    public modal = false;

    public player = true;

    public openModal( movie: Movie ) {
        this.state.current = movie;
        this.state.modal = true;

        console.log(this);
    }
}