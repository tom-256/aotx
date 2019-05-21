import React from 'react';
import axios from 'axios';
import { AlbumList } from '../components/AlbumList';
import { IAlbum } from 'models/Album';

interface IProps {
    albums: IAlbum[];
}

export default class App extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
        this.state = { albums: [{ name: '', artists: '', imageUrl: '' }] };
    }

    async onChange(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.target.value);
        const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
        console.log(result.data);
        this.setState({ albums: result.data });
    }

    public render() {
        return (
            <ul>
                <input type="form" onChange={e => this.onChange(e)} />
                <AlbumList albums={this.state.albums} />
            </ul>
        );
    }
}
