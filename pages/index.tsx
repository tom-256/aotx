import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { IAlbum } from 'models/Album';
import { AlbumContext } from '../contexts/album';
import axios from 'axios';

const selectedAlbumLimit = 9;

type AppState = {
    searchResults: IAlbum[];
    selectedAlbums: IAlbum[];
};

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [],
            selectedAlbums: []
        };

        this.pushSelectedAlbum = this.pushSelectedAlbum.bind(this);
        this.removeSelectedAlbum = this.removeSelectedAlbum.bind(this);
        this.clearSelectedAlbum = this.clearSelectedAlbum.bind(this);
        this.canCheck = this.canCheck.bind(this);
        this.albumCheckBoxOnchange = this.albumCheckBoxOnchange.bind(this);
    }

    pushSelectedAlbum(checkedAlbum: IAlbum) {
        this.setState((prevState: AppState) => ({ selectedAlbums: [...prevState.selectedAlbums, checkedAlbum] }));
    }

    removeSelectedAlbum(uncheckedAlbum: IAlbum) {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album !== uncheckedAlbum;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    }

    clearSelectedAlbum() {
        this.setState({ selectedAlbums: [] });
    }

    canCheck() {
        if (this.state.selectedAlbums.length < selectedAlbumLimit) {
            return true;
        }
        return false;
    }

    albumCheckBoxOnchange(e: React.FormEvent<HTMLInputElement>, album: IAlbum) {
        console.log(this.state);
        if (e.target.checked) {
            if (this.canCheck()) {
                this.pushSelectedAlbum(album);
            } else {
                e.target.checked = false;
            }
        } else {
            this.removeSelectedAlbum(album);
        }
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

    render() {
        return (
            <div>
                <div>
                    {this.state.selectedAlbums.map(album => (
                        <img src={album.imageUrl} width="50" height="50" />
                    ))}
                </div>
                <AlbumContext.Provider value={{ handleOnChange: this.albumCheckBoxOnchange }}>
                    <input type="search" onChange={e => this.onChange(e)} />
                    <SearchedAlbumList searchResults={this.state.searchResults} />
                </AlbumContext.Provider>
            </div>
        );
    }
}
