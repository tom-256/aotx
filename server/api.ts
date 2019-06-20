import * as express from 'express';
import nextapp from './nextapp'
// import { format } from 'util';
// import SpotifyWebApi from 'spotify-web-api-node';
// import { Album } from '../models/Album';
// import { SearchResult } from '../models/SearchResult';
// import * as multer from 'multer';
// import { Storage } from '@google-cloud/storage';

const router = express.Router();
// const storage = new Storage();


// if (process.env.GCLOUD_STORAGE_BUCKET === undefined) throw Error('set cloud storage');
// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// const multerStorage = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//     }
// });

// router.post('/upload', multerStorage.single('file'), (req, res, next) => {
//   console.log('received /upload');
//   if (!req.file) {
//       res.status(400).send('No file uploaded.');
//       return;
//   }

//   // Create a new blob in the bucket and upload the file data.
//   const blob = bucket.file(req.file.originalname);
//   const blobStream = blob.createWriteStream({
//       resumable: false
//   });

//   blobStream.on('error', err => {
//       next(err);
//   });

//   blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
//       res.status(200).send(publicUrl);
//   });

//   blobStream.end(req.file.buffer);
// });

router.post('/upload', (req, res) => {
    console.log('post upload');
    return nextapp.render(req, res, '/share', req.query)
});

router.get('/search', async () => {
    console.log('get search');

    return;
    // const client = await initClient();
    // const albums = await searchAlbums(client, req.query);
    // return albums;
});

// const initClient = async (): Promise<SpotifyWebApi> => {
//     const spotifyApi = new SpotifyWebApi({
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//     });
//     const token = await spotifyApi.clientCredentialsGrant();
//     await spotifyApi.setAccessToken(token.body['access_token']);
//     return spotifyApi;
// };

// const searchAlbums = async (client: SpotifyWebApi, query: string): Promise<SearchResult> => {
//     console.log(client);
//     console.log(query);
//     const dummy: Album[] = [{ name: '', imageUrl: '', artists: '', id: '' }];
//     const searchResult: SearchResult = { albums: dummy, next: '' };
//     // const q = query.searchword.toString();
//     // let result;
//     // if (query.offset) {
//     //     const offset = query.offset.toString();
//     //     const option = { offset: offset };
//     //     result = await client.searchAlbums(q, option);
//     // } else {
//     //     result = await client.searchAlbums(q);
//     // }
//     // let albums: Album[] = [];
//     // result.body.albums.items.forEach((album: any) => {
//     //     let artists: string[] = [];
//     //     album.artists.forEach((artist: any) => {
//     //         artists.push(artist.name);
//     //     });
//     //     const imageUrl = album.images[albumImageIndexOf300x300].url;
//     //     const albumObject: Album = { id: album.id, name: album.name, artists: artists.join(), imageUrl: imageUrl };
//     //     albums.push(albumObject);
//     // });
//     // const next: string = result.body.albums.next;
//     // const searchResult: SearchResult = { albums: albums, next: next };
//     return searchResult;
// };

export default router;
