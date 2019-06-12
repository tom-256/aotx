import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { SelectedAlbumContainer } from '../components/SelectedAlbumContainer';
import { Album } from 'models/Album';
import { SearchedResultContext } from '../contexts/SearchedResultContext';
import { SelectedAlbumContext } from '../contexts/SelectedAlbumContext';
import axios from 'axios';
import querystring from 'querystring';

const selectedAlbumLimit = 9;

type AppState = {
    searchResults: Album[];
    selectedAlbums: Album[];
};

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [],
            selectedAlbums: []
        };
        this.timer = null;
    }

    timer: NodeJS.Timeout | null;

    pushSelectedAlbum = (checkedAlbum: Album) => {
        this.setState((prevState: AppState) => ({ selectedAlbums: [...prevState.selectedAlbums, checkedAlbum] }));
    };

    removeSelectedAlbum = (uncheckedAlbum: Album) => {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album.id !== uncheckedAlbum.id;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    };

    clearSelectedAlbum = () => {
        this.setState({ selectedAlbums: [] });
    };

    canCheck = () => {
        if (this.state.selectedAlbums.length < selectedAlbumLimit) {
            return true;
        }
        return false;
    };

    albumCheckBoxOnchange = (e: React.FormEvent<HTMLInputElement>, album: Album) => {
        if (e.target.checked) {
            if (this.canCheck()) {
                this.pushSelectedAlbum(album);
            } else {
                e.target.checked = false;
            }
        } else {
            this.removeSelectedAlbum(album);
        }
    };

    selectedAlbumOnClick = (e: React.FormEvent<HTMLInputElement>, album: Album) => {
        this.removeSelectedAlbum(album);
    };

    resetTimer = () => {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    }

    searchFormOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
        console.log('---start---');
        console.log('input event is called');
        event.persist();
        event.preventDefault();

        console.log(event.target.value);

        this.resetTimer();
        this.timer = setTimeout(async () => {
            if (event.target.value.length == 0) {
                this.setState({ searchResults: [] });
                console.log('---clear search result end---');
                console.log('search result is cleared');
            } else {
                const qs = querystring.stringify({searchword: event.target.value});
                const result = await axios.get(`http://localhost:3000/search?${qs}`);
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
    };

    render() {
        return (
            <div>
                <SelectedAlbumContext.Provider value={{ handleOnClick: this.selectedAlbumOnClick }}>
                    <SelectedAlbumContainer selectedAlbums={this.state.selectedAlbums} />
                </SelectedAlbumContext.Provider>
                <SearchedResultContext.Provider value={{ handleOnChange: this.albumCheckBoxOnchange }}>
                    <input type="search" onChange={e => this.searchFormOnChange(e)} />
                    <SearchedAlbumList searchResults={this.state.searchResults} selectedAlbums={this.state.selectedAlbums} />
                </SearchedResultContext.Provider>
            </div>
        );
    }
}
