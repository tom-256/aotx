import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { SelectedAlbumContainer } from '../components/SelectedAlbumList';
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
        this.timer = null;
    }
    
    timer: NodeJS.Timeout;

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

    async searchAlbums(keyword: string) {
        const albums: IAlbum[] = [];
        return albums;
    }
    async searchFormOnChange(event: React.FormEvent<HTMLInputElement>) {
        console.log('---start---');
        console.log('input event is called');
        event.persist();
        event.preventDefault();

        console.log(event.target.value);

        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
            if (event.target.value.length == 0) {
                this.setState({ searchResults: [] });
                console.log('---clear search result end---');
                console.log('search result is cleared');
            } else {
                const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
                console.log('api called');
                console.log('result');
                console.log(result);
                console.log('albums');
                console.log(result.data);
                this.setState({ searchResults: result.data });
                console.log('api called and setstate');
                console.log('---call api end---');
            }
        }, 300);
    }

    render() {
        return (
            <div>
                <SelectedAlbumContainer>
                    {this.state.selectedAlbums.map(album => (
                        <img src={album.imageUrl} width="50" height="50" />
                    ))}
                </SelectedAlbumContainer>
                <AlbumContext.Provider value={{ handleOnChange: this.albumCheckBoxOnchange }}>
                    <input type="search" onChange={e => this.searchFormOnChange(e)} />
                    <SearchedAlbumList searchResults={this.state.searchResults} />
                </AlbumContext.Provider>
            </div>
        );
    }
}
