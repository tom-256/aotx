import { IAlbum } from '../models/Album';
const SpotifyWebApi = require('spotify-web-api-node');

const albumImageIndexOf300x300 = 1;

export const searchAlbums = async (keyword: string) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });
    console.log('spotifyApi')
    console.log(spotifyApi)
    const token = await spotifyApi.clientCredentialsGrant();
    await spotifyApi.setAccessToken(token.body['access_token']);
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
};
