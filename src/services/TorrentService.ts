import { Providers } from "@/classes/Providers";
import { TPB } from "@/classes/TPB";

export class TorrentService {
    public async search(imdbId: string) {
        return await Providers.getProvider<TPB>('TPB').search(imdbId);
    }

    public async recentlyAdded() {
        // const api = new RarbgApi();

        // return await api.list({
        //     limit: 20,
        //     category: [
        //         api.categories.MOVIES_X264,
        //         api.categories.MOVIES_X264_720,
        //         api.categories.MOVIES_X264_1080,
        //     ],
        //     sort: 'seeders'
        // })
    }
}