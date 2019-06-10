import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';
import { IAlbum } from '../models/Album';
const SpotifyWebApi = require('spotify-web-api-node');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const albumImageIndexOf300x300 = 1;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});
async function initApiClient() {
    const token = await spotifyApi.clientCredentialsGrant();
    await spotifyApi.setAccessToken(token.body['access_token']);
}

async function searchAlbums(keyword: string) {
    const result = await spotifyApi.searchAlbums(keyword);
    let albums: IAlbum[] = [];
    result.body.albums.items.forEach((album: any) => {
        let artists: string[] = [];
        album.artists.forEach((artist: any) => {
            artists.push(artist.name);
        });
        const imageUrl = album.images[albumImageIndexOf300x300].url;
        const albumObject: IAlbum = { name: album.name, artists: artists.join(), imageUrl: imageUrl };
        albums.push(albumObject);
    });
    return albums;
}

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            await initApiClient();
            const parsedUrl = parse(req.url!, true);
            const { pathname, query } = parsedUrl;
            if (pathname === '/search') {
                console.log('request received');
                const albums = await searchAlbums(query.searchword.toString());
                console.log(albums);
                console.log(albums.length);
                res.end(JSON.stringify(albums));
            } else {
                handle(req, res, parsedUrl);
            }
        } catch (error) {
            console.error(error);
        }
    }).listen(port);
});
