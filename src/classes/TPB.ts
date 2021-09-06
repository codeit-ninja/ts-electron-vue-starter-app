import axios, { AxiosInstance } from 'axios';

type TPBSearchConfig = {
    q: string;
    cat: number;
}

export class TPB {
    public static CATEGORIES = {
        movies: 201,
        movies_hd: 207,
        tv: 205,
        tv_hd: 208
    }

    protected http: AxiosInstance;

    constructor() {
        this.http = axios.create({ baseURL: 'https://apibay.org' });
    }

    public async search( imdbId: string ) {
        const response = await this.http.get<Torrent[]>(`/q.php?q=${imdbId}&cat=${TPB.CATEGORIES.movies_hd}`);
        
        return {
            _4k: response.data.filter(torrent => ['4k', '2160p', 'udh'].some(_4k => torrent.name.toLowerCase().includes(_4k))),
            _1080: response.data.filter(torrent => ['1080p', 'fhd'].some(_1080 => torrent.name.toLowerCase().includes(_1080))),
            _720: response.data.filter(torrent => ['720p'].some(_720 => torrent.name.toLowerCase().includes(_720))),
        }
    }
}