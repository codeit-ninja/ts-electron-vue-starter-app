import { reactive, UnwrapRef, toRaw } from "vue";
export default abstract class Store<C> {
    /**
     * Store state
     * 
     * Returns reactive state
     * 
     * @public
     * @type { C }
     */
    public state!: UnwrapRef<Omit<C, 'state' | 'model'>>;

    /**
     * Copy of store data
     * 
     * Returns a non-reactive copy of the store state
     * 
     * @public
     * @type { C }
     */
    public model!: Omit<C, 'model' | 'state'>;

    constructor() {
        // @ts-expect-error: This line will always work because JavaScript has some flaws
        this.state = reactive(toRaw(this));

        // @ts-expect-error: This line will always work because JavaScript has some flaws
        this.model = toRaw({...this});

        // @ts-expect-error: This line will always work because JavaScript has some flaws
        delete this.model.state;
    }

    /**
     * Commit model changes to store state
     * 
     * @public
     */
    public commit() {
        // @ts-expect-error: Ignore because we loop over own object
        Object.keys(this.model).forEach(key => this.state[key] = this.model[key])
    }
}