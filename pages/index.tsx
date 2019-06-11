import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { SelectedAlbumContainer } from '../components/SelectedAlbumContainer';
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

    }

    timer: NodeJS.Timeout = null;

    pushSelectedAlbum = (checkedAlbum: IAlbum) => {
        this.setState((prevState: AppState) => ({ selectedAlbums: [...prevState.selectedAlbums, checkedAlbum] }));
    }

    removeSelectedAlbum = (uncheckedAlbum: IAlbum) => {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album !== uncheckedAlbum;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    }

    clearSelectedAlbum = () => {
        this.setState({ selectedAlbums: [] });
    }

    canCheck = () => {
        if (this.state.selectedAlbums.length < selectedAlbumLimit) {
            return true;
        }
        return false;
    }

    albumCheckBoxOnchange = (e: React.FormEvent<HTMLInputElement>, album: IAlbum) => {
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

    searchFormOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
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
