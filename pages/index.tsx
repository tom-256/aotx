import React from 'react';
import axios from 'axios';
import AlbumList from '../components/AlbumList';
import { IAlbum } from 'models/Album';

interface IAppState {
    searchResults: IAlbum[];
}

export default class App extends React.Component<{}, IAppState> {
    constructor(p: {}) {
        super(p);
        this.state = {
            searchResults: []
        };
    }
    async onChange(event: React.FormEvent<HTMLInputElement>) {
        if (event.target.value.length == 0) {
            this.setState({ searchResults: [] });
        } else {
            this.setState({ searchResults: [] });
            const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
            this.setState({ searchResults: result.data });
        }
    }

    public render() {
        return (
            <div>
                <input type="search" onChange={e => this.onChange(e)} />
                <AlbumList searchResults={this.state.searchResults}/>
            </div>
        );
    }
}
