import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';
import { Album } from '../models/Album';
import { SearchResult } from '../models/SearchResult';
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

async function searchAlbums(query: any) {
    const q = query.searchword.toString();
    let result;
    if (query.offset){
        const offset = query.offset.toString();
        const option = {offset: offset}
        result = await spotifyApi.searchAlbums(q, option);
    }else{
        result = await spotifyApi.searchAlbums(q);
    }
    console.log(result.body)
    let albums: Album[] = [];
    result.body.albums.items.forEach((album: any) => {
        let artists: string[] = [];
        album.artists.forEach((artist: any) => {
            artists.push(artist.name);
        });
        const imageUrl = album.images[albumImageIndexOf300x300].url;
        const albumObject: Album = { id: album.id, name: album.name, artists: artists.join(), imageUrl: imageUrl };
        albums.push(albumObject);
    });
    const next: string = result.body.albums.next;
    const searchResult: SearchResult = { albums: albums, next: next };
    console.log(searchResult);
    return searchResult;
}

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            await initApiClient();
            const parsedUrl = parse(req.url!, true);
            const { pathname, query } = parsedUrl;
            if (pathname === '/search') {
                const albums = await searchAlbums(query);
                res.end(JSON.stringify(albums));
            } else {
                handle(req, res, parsedUrl);
            }
        } catch (error) {
            console.error(error);
        }
    }).listen(port);
});
