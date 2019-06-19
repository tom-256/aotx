import * as next from 'next';
import { Album } from '../models/Album';
import { SearchResult } from '../models/SearchResult';
import * as express from 'express';
import * as multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { format } from 'util';

const SpotifyWebApi = require('spotify-web-api-node');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const albumImageIndexOf300x300 = 1;
const storage = new Storage();
if (process.env.GCLOUD_STORAGE_BUCKET === undefined) throw Error('set cloud storage');
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const multerStorage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

// async function initApiClient() {
//     const spotifyApi = new SpotifyWebApi({
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//     });
//     const token = await spotifyApi.clientCredentialsGrant();
//     const accessToken = await spotifyApi.setAccessToken(token.body['access_token']);
//     return { spotifyApi: spotifyApi, toekn: token };
// }

// async function searchAlbums(query: any) {
//     const q = query.searchword.toString();
//     let result;
//     if (query.offset) {
//         const offset = query.offset.toString();
//         const option = { offset: offset };
//         result = await spotifyApi.searchAlbums(q, option);
//     } else {
//         result = await spotifyApi.searchAlbums(q);
//     }
//     let albums: Album[] = [];
//     result.body.albums.items.forEach((album: any) => {
//         let artists: string[] = [];
//         album.artists.forEach((artist: any) => {
//             artists.push(artist.name);
//         });
//         const imageUrl = album.images[albumImageIndexOf300x300].url;
//         const albumObject: Album = { id: album.id, name: album.name, artists: artists.join(), imageUrl: imageUrl };
//         albums.push(albumObject);
//     });
//     const next: string = result.body.albums.next;
//     const searchResult: SearchResult = { albums: albums, next: next };
//     console.log(searchResult);
//     return searchResult;
// }

app.prepare().then(() => {
    const server = express();

    server.get('/', (req, res) => {
        console.log('render root');
        return handle(req, res);
    });

    server.get('/share', (req, res) => {
        console.log('render share');
        return handle(req, res);
    });

    server.post('/upload', multerStorage.single('file'), (req, res, next) => {
        console.log('received /upload');
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('error', err => {
            next(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            res.status(200).send(publicUrl);
        });

        blobStream.end(req.file.buffer);
    });

    server.get('/search', async (req, res) => {
        console.log(req);
        console.log(res);
        return;
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
