import { createServer } from 'http'
import { parse } from 'url'
import * as next from 'next'
const SpotifyWebApi = require('spotify-web-api-node')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const albumImageIndexOf300x300 = 0

interface IAlbum {
    name: string;
    artists: string;
    image: string;
}


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
async function initApiClient(){
    const token = await spotifyApi.clientCredentialsGrant()
    await spotifyApi.setAccessToken(token.body['access_token'])
}

async function searchAlbums(keyword: string){
    const result = await spotifyApi.searchAlbums(keyword);
    let albums: IAlbum[] = []
    result.body.albums.items.forEach((album: any) => {
        let albumObject: IAlbum = {name:'',artists:'',image:''}
        albumObject['name'] = album.name
        let artists: string[] = []
        album.artists.forEach((artist: any) => { artists.push(artist.name)})
        albumObject['artists'] = artists.join()
        albumObject['image'] = album.images[albumImageIndexOf300x300].url
        albums.push(albumObject)
    })
    return albums;
}

app.prepare().then(() => {
    createServer(async (req, res) => {
        await initApiClient()
        const parsedUrl = parse(req.url!, true)
        const { pathname, query } = parsedUrl
        if (pathname === '/search') {
            console.log('request received')
            const albums = await searchAlbums(query.searchword.toString())
            res.end(JSON.stringify(albums[0].name))
            console.log(query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port)
})
