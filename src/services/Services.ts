import { ipcMain } from "electron";
import { MovieService } from "./MovieService";
import { StreamingService } from "./StreamService";
import { TorrentService } from "./TorrentService";

export const INJECTIONS_SYMBOL = Symbol('__injections__')

export interface iServices {
    TorrentService: TorrentService,
    StreamingService: StreamingService,
    MovieService: MovieService,
}

export const services: iServices = {
    TorrentService: new TorrentService,
    StreamingService: new StreamingService,
    MovieService: new MovieService,
}

export class ServiceNotFoundError extends Error {
    constructor(readonly service: string) {
        super(`Cannot find service named ${service}!`)
    }
}
export class ServiceMethodNotFoundError extends Error {
    constructor(readonly service: string, readonly method: string) {
        super(`Cannot find method named ${method} in service [${service}]!`)
    }
}