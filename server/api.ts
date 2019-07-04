import express from 'express';
import nextapp from '../server/nextapp';
import { format } from 'util';
import { Album } from '../models/Album';
import { SearchResult } from '../models/SearchResult';
import { Storage } from '@google-cloud/storage';
import Canvas from 'canvas';
const SpotifyWebApi = require('spotify-web-api-node');

const albumImageIndexOf300x300 = 1;
const canvasWidth = 900;
const canvasHeight = 900;
const router = express.Router();

const createImageBuff = async (selectedAlbums: Album[]): Promise<Buffer> => {
    const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    for (let xIndex = 0; xIndex <= 600; xIndex = xIndex + 300) {
        for (let yIndex = 0; yIndex <= 600; yIndex = yIndex + 300) {
            if (selectedAlbums.length > 0) {
                const url = selectedAlbums.shift();
                if (!url) continue;
                const i = await Canvas.loadImage(url.imageUrl);
                ctx.drawImage(i, xIndex, yIndex);
            }
        }
    }
    return canvas.toBuffer();
};

const makeid = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const saveImageToStorage = async (imageBuffer: Buffer) => {
    const storage = new Storage();
    if (process.env.GCLOUD_STORAGE_BUCKET === undefined) throw Error('set cloud storage');
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    const filename = `${Date.now()}${makeid(8)}.png`;
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('error', err => {
        console.log(err);
        throw err;
    });
    blobStream.on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        console.log(publicUrl);
        return publicUrl;
    });
    blobStream.end(imageBuffer);
};

router.post('/upload', async (req, res) => {
    console.log('post upload');
    const selectedAlbums = req.body;
    const imageBuff = await createImageBuff(selectedAlbums);
    const publicUrl = await saveImageToStorage(imageBuff);
    console.log(publicUrl);
    return nextapp.render(req, res, '/share');
});

router.get('/search', async (req, res) => {
    try {
        const client = await initClient();
        const albums = await searchAlbums(client, req.query);
        return res.send(albums);
    } catch (error) {
        throw error;
    }
});

const initClient = async () => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });
    const token = await spotifyApi.clientCredentialsGrant();
    await spotifyApi.setAccessToken(token.body['access_token']);
    return spotifyApi;
};

const searchAlbums = async (client: any, query: any): Promise<SearchResult> => {
    const q = query.searchword.toString();
    const result = query.offset ? await client.searchAlbums(q, { offset: query.offset }) : await client.searchAlbums(q);
    if (result.statusCode != 200) throw Error('search api failer');
    if (!result.body.albums) return { albums: [{ name: '', artists: '', id: '', imageUrl: '' }], next: '' };
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
    return searchResult;
};

export default router;
