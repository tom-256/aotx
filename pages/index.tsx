import React from 'react';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { SelectedAlbumContainer } from '../components/SelectedAlbumContainer';
import { Album } from 'models/Album';
import { SearchedResultContext } from '../contexts/SearchedResultContext';
import { SelectedAlbumContext } from '../contexts/SelectedAlbumContext';
import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';
import { SearchResult } from 'models/SearchResult';
import Link from 'next/link';
import { config } from '../lib/config';

const selectedAlbumLimit = 9;

type AppState = {
    searchResult: SearchResult;
    displayedAlbums: Album[];
    selectedAlbums: Album[];
    inputValue: string;
};

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchResult: null,
            displayedAlbums: [],
            selectedAlbums: [],
            inputValue: ''
        };
        this.timer = null;
    }

    timer: number | null;

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
    };

    searchFormOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
        console.log('input onchange');
        event.persist();
        event.preventDefault();

        this.setState({ inputValue: event.target.value });

        this.resetTimer();
        this.timer = setTimeout(async () => {
            if (event.target.value.length == 0) {
                this.setState({ displayedAlbums: [] });
            } else {
                const qs = querystring.stringify({ searchword: event.target.value });
                console.log(qs);
                console.log(`${config.server}/search?${qs}`);
                // const res = await fetch(`${config.server}/search?${qs}`, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Accept: 'application/json'
                //     }
                // });
                const res = await fetch(`http://localhost:3000/api/search`);
                console.log(res)
                // const data = await res.json();
                // const seachResult: SearchResult = { albums: data.albums, next: data.next };
                // this.setState({ displayedAlbums: data.albums, searchResult: seachResult });
            }
        }, 300);
    };

    isBottom = () => {
        const rootLayer = document.getElementById('rootLayer');
        if (rootLayer === null) return false;
        return rootLayer.getBoundingClientRect().bottom <= window.innerHeight;
    };

    handleScroll = () => {
        if (!this.isBottom()) return;
        if (this.state.searchResult === null) return;
        if (this.state.searchResult.next === null) return;
        const found = this.state.searchResult.next.match(/(?<=offset=)(.*)(?=&)/g);
        if (found === null) return;
        const offset = found[0];
        const qs = querystring.stringify({ searchword: this.state.inputValue, offset: offset });
        this.resetTimer();
        this.timer = setTimeout(async () => {
            const res = await fetch(`${config.server}/search?${qs}`);
            const data = await res.json();
            const searchedItems = data.albums;
            const seachResult: SearchResult = { albums: searchedItems, next: data.next };
            this.setState((prevState: AppState) => ({ displayedAlbums: [...prevState.displayedAlbums, ...searchedItems], searchResult: seachResult }));
        }, 500);
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div id="rootLayer">
                <SelectedAlbumContext.Provider value={{ handleOnClick: this.selectedAlbumOnClick }}>
                    <SelectedAlbumContainer selectedAlbums={this.state.selectedAlbums} />
                </SelectedAlbumContext.Provider>
                <SearchedResultContext.Provider value={{ handleOnChange: this.albumCheckBoxOnchange }}>
                    <input type="search" onChange={e => this.searchFormOnChange(e)} value={this.state.inputValue} />
                    <form method="POST" action="/api/upload" encType="multipart/form-data">
                        <input type="submit" value="create image"></input>
                    </form>
                    <SearchedAlbumList searchResults={this.state.displayedAlbums} selectedAlbums={this.state.selectedAlbums} />
                </SearchedResultContext.Provider>
            </div>
        );
    }
}
