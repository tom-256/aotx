import React from 'react';
import axios from 'axios';
import AlbumList from '../components/AlbumList';
import { IAlbum } from 'models/Album';

export default class App extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
        this.state = { albums: [] };
    }

    async onChange(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.target.value);
        const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
        console.log(result.data);
        this.setState({ albums: result.data });
    }

    public render() {
        return (
            <div>
                <input type="form" onChange={e => this.onChange(e)} />
                <AlbumList albums={this.state.albums} />
            </div>
        );
    }
}
