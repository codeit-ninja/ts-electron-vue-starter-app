import { reactive, UnwrapRef } from "vue";

export default abstract class Store<C> {
    /**
     * Is store loading data?
     * 
     * @public
     * @type { boolean }
     */
    public loading = false;

    /**
     * Is store updating data?
     * 
     * @public
     * @type { boolean }
     */
    public updating = false;

    /**
     * Store state
     * 
     * Returns reactive state
     * 
     * @public
     * @type { C }
     */
    public state: UnwrapRef<Omit<C, 'state' | 'model'>>;

    /**
     * Copy of store data
     * 
     * Returns a non-reactive copy of the store state
     * 
     * @public
     * @type { C }
     */
    public model: Omit<C, 'model' | 'state'>;

    constructor() {
        // @ts-expect-error: This line will always work because JavaScript has some flaws
        this.state = reactive(this);

        // @ts-expect-error: This line will always work because JavaScript has some flaws
        this.model = { ...this.state };

        // @ts-expect-error: This line will always work because JavaScript has some flaws
        delete this.model.state;
    }

    /**
     * Commit model changes to store state
     * 
     * @public
     */
    public commit() {
        // @ts-expect-error: This line will always work because JavaScript has some flaws
        Object.keys(this.model).forEach(key => this.state[key] = this.model[key])
    }
}