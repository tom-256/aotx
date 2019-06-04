import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { IAlbum } from 'models/Album';
import { AlbumContext } from '../contexts/album';
import axios from 'axios';

const selectedAlbumLimit = 9;

type AppState = {
    searchResults: IAlbum[];
    selectedAlbums: IAlbum[];
    isSearching: boolean;
};

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [],
            selectedAlbums: [],
            isSearching: false
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

    delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    async searchFormOnChange(event: React.FormEvent<HTMLInputElement>) {
        event.persist();
        console.log(event.target.value);
        console.log(this.state.isSearching);
        if (this.state.isSearching == true) return;
        await this.delay(1000);
        if (event.target.value.length == 0) {
            this.setState({ searchResults: [] });
            console.log('search result is cleared');

        } else {
            this.setState({ searchResults: [], isSearching: true });
            const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
            console.log('api called');
            console.log(result.data);
            this.setState({ searchResults: result.data, isSearching: false });
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
                    <input type="search" onChange={e => this.searchFormOnChange(e)} />
                    <SearchedAlbumList searchResults={this.state.searchResults} />
                </AlbumContext.Provider>
            </div>
        );
    }
}
