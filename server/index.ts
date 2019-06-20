require("dotenv").config();

import * as express from 'express';
import nextapp from './nextapp'
import router from './api';

const port = parseInt(process.env.PORT || '3000', 10);

const handle = nextapp.getRequestHandler();
// const albumImageIndexOf300x300 = 1;

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

nextapp.prepare().then(() => {
    const server = express();

    server.use('/api', router);

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.post('/api/upload', () => {
        console.log('hogehoge')
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
