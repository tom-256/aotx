import React from 'react';
import axios from 'axios';
import AlbumList from '../components/AlbumList';
import { IAlbum } from 'models/Album';

interface IAppState {
    seachedAlbums: IAlbum[];
    selectedAlbums: IAlbum[];
}

export default class App extends React.Component<{}, IAppState> {
    constructor(p: {}) {
        super(p);
        this.state = {
            selectedAlbums: []
        }
    }

    async onChange(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.target.value);
        const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
        console.log(result.data);
        this.setState({ seachedAlbums: result.data });
    }

    public render() {
        return (
            <div>
                <input type="form" onChange={e => this.onChange(e)} />
                <AlbumList albums={this.state.seachedAlbums}></AlbumList>
            </div>
        );
    }
}
