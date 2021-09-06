import { Omdb } from '@/classes/Omdb';
import { MovieDb } from 'moviedb-promise';
import { TPB } from './TPB';

/**
 * Providers implementation
 * 
 * @property { Omdb } omdb
 * @property { MovieDb } tmdb
 */
export class Providers {
    /**
     * Providers instance
     * 
     * @protected
     * @type { Providers }
     */
    protected static _instance: Providers;

    /**
     * OMDb api provider
     * 
     * @public
     * @type { Omdb }
     */
    public omdb = new Omdb( 'b7eb1481' );

    /**
     * TMDb api provider
     * 
     * @public
     * @type { Omdb }
     */
    public tmdb = new MovieDb('787140aa5af99e2bab3428c0aab96e43');

    /**
     * Thepiratebay api provider
     * 
     * @public
     * @type { TPB }
     */
    public TPB = new TPB();

    /**
     * TypeScript type for adding custom providers
     * 
     * @public
     */
    [key: string]: any;

    /**
     * Get providers instance
     * 
     * @public
     * @constructs Providers
     * @type { Providers }
     */
    public static get instance() {
        if( ! Providers._instance ) Providers._instance = new Providers();

        return Providers._instance;
    }

    /**
     * Constructor
     * 
     * @constructor
     * @constructs Providers
     * @type { Providers }
     */
    private constructor() {};

    /**
     * Add custom provider
     * 
     * Overwrites existing providers
     * 
     * @param name 
     * @param implementation 
     */
    public static addProvider( name: string, implementation: { new(): any } ) {
        Providers.instance[name] = new implementation();
    }

    /**
     * Get a instance of given provider
     * 
     * @param name
     */
    public static getProvider<T>( name: string ): T {
        return Providers.instance[name];
    }
}