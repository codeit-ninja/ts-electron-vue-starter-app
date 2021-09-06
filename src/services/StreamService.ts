import { app } from 'electron';
import express from 'express';
import WebTorrent from 'webtorrent';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

export class StreamingService {
    protected _server: express.Application;

    protected _torrent!: WebTorrent.Instance;

    protected _interval!: NodeJS.Timer;

    protected _ffmpeg: ffmpeg.FfmpegCommand;

    constructor() {
        this._torrent = new WebTorrent();
        this._server = express();
        this._server.listen(80, () => console.log('Streaming server is running on port 80'));
        this._ffmpeg = ffmpeg();
        this._ffmpeg.setFfmpegPath(ffmpegPath.path);
    }

    public stream( hash: string ) {
        const self = this;

        this._torrent.add(hash, torrent => {
            torrent.files.forEach(file => {
                if(file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
                    this._server.get("/video", function (req, res) {
                        console.log('requested bytes to stream.');
            
                        // Ensure there is a range given for the video
                        const range = req.headers.range;
                        
                        if (!range) res.status(400).send("Requires Range header");
            
                        const CHUNK_SIZE = 10 ** 6; // 1MB
                        const start = Number(range?.replace(/\D/g, ""));
                        const end = Math.min(start + CHUNK_SIZE, file.length - 1);
            
                        const stream = file.createReadStream({ start: start, end: end });
            
                        // Create headers
                        const contentLength = end - start + 1;
                        const headers = {
                            "Content-Range": `bytes ${start}-${end}/${file.length}`,
                            "Accept-Ranges": "bytes",
                            "Content-Length": contentLength,
                            "Content-Type": "video/mp4",
                        };

                        // HTTP Status 206 for Partial Content
                        res.writeHead(206, headers);
                        
                        

                        // ffmpeg()
                        //     .input(stream)
                        //     .format('mp4')
                        //     .pipe(res)
                        // create video read stream for this particular chunk
                        //const videoStream = fs.createReadStream(videoPath, { start, end });
                        // Stream the video chunk to the client
                        //stream.pipe(res);
                    });
                }
            })

            setInterval(() => {
                console.log(this._torrent.downloadSpeed);
            }, 1000)

            console.log('Torrent added ' + hash);
        })

        // this._torrent.on('ready', () => {
        //     this._torrent.files.forEach(file => {
        //         if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
        //             console.log(file);

        //             this._server.get("/video", function (req, res) {
        //                 console.log('requested bytes to stream.');

        //                 // Ensure there is a range given for the video
        //                 const range = req.headers.range;

        //                 if (!range) res.status(400).send("Requires Range header");

        //                 const CHUNK_SIZE = 10 ** 6; // 1MB
        //                 const start = Number(range?.replace(/\D/g, ""));
        //                 const end = Math.min(start + CHUNK_SIZE, file.length - 1);

        //                 const stream = file.createReadStream({ start: start, end: end });

        //                 // Create headers
        //                 const contentLength = end - start + 1;
        //                 const headers = {
        //                     "Content-Range": `bytes ${start}-${end}/${file.length}`,
        //                     "Accept-Ranges": "bytes",
        //                     "Content-Length": contentLength,
        //                     "Content-Type": "video/mp4",
        //                 };

        //                 // HTTP Status 206 for Partial Content
        //                 res.writeHead(206, headers);

        //                 // create video read stream for this particular chunk
        //                 //const videoStream = fs.createReadStream(videoPath, { start, end });

        //                 // Stream the video chunk to the client
        //                 stream.pipe(res);
        //             });
        //         }
        //     })

        //     this._interval = setInterval(() => {
        //         console.log(this._torrent.swarm.downloaded)
        //     }, 1000)
        // })
    }
}