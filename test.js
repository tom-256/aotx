const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
const albumImageIndexOf300x300 = 0;
spotifyApi
    .clientCredentialsGrant()
    .then(function(data) {
        // Set the access token on the API object so that it's used in all future requests
        spotifyApi.setAccessToken(data.body['access_token']);

        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.searchAlbums('tyler');
    })
    .then(function(data) {
        data.body.albums.items.forEach(element => {
            console.log(element.name);
            let artists =[];
            element.artists.forEach(artist => { artists.push(artist.name)})
            console.log(artists.join())
            console.log(element.images[albumImageIndexOf300x300].url);
        });
    })
    .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });
