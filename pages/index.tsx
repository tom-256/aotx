import React from 'react';
import axios from 'axios';
import { SearchedAlbumList } from '../components/SearchedAlbumList';
import { IAlbum } from 'models/Album';
import { AlbumContext } from '../contexts/album';
import { SelectedAlbumList } from '../components/SelectedAlbumList';
const selectedAlbumLimit = 9;

type AppState = {
    searchResults: IAlbum[];
    selectedAlbums: IAlbum[];
};

export default class App extends React.Component<{}, AppState> {
    state: AppState = {
        searchResults: [],
        selectedAlbums: []
    };

    pushSelectedAlbum = (checkedAlbum: IAlbum) => {
        this.setState((prevState: AppState) => {
            selectedAlbums: prevState.selectedAlbums.push(checkedAlbum);
        });
    };

    removeSelectedAlbum = (uncheckedAlbum: IAlbum) => {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album !== uncheckedAlbum;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    };

    clearSelectedAlbum() {
        this.setState({ selectedAlbums: [] });
    }

    canCheck = () => {
        if (this.state.selectedAlbums.length < selectedAlbumLimit) {
            return true;
        }
        return false;
    };

    albumCheckBoxOnchange = (e: React.FormEvent<HTMLInputElement>, album: IAlbum) => {
        console.log(this)
        console.log(e.target)
        console.log(album)
        if (e.checked) {
            if (this.canCheck()) {
                this.pushSelectedAlbum(album);
            } else {
                e.checked = false;
            }
        } else {
            this.removeSelectedAlbum(album);
        }
    };

    async onChange(event: React.FormEvent<HTMLInputElement>) {
        if (event.target.value.length == 0) {
            this.setState({ searchResults: [] });
        } else {
            this.setState({ searchResults: [] });
            // const result = await axios.get(`http://localhost:3000/search?searchword=${event.target.value}`);
            const result = {
                data: [
                    { name: 'IGOR', artists: 'Tyler, The Creator', imageUrl: 'https://i.scdn.co/image/4db4370eb6b2fd2800cc428879143dfc7866180c' },
                    { name: 'Flower Boy', artists: 'Tyler, The Creator', imageUrl: 'https://i.scdn.co/image/8978ca55e89fc664cbf672804a90ac7afb142fd0' },
                    { name: 'Purgatory', artists: 'Tyler Childers', imageUrl: 'https://i.scdn.co/image/520705e7d95eb24a3794ed440cd661d32e45e9b9' },
                    {
                        name: 'Tyler Childers | OurVinyl Sessions',
                        artists: 'Tyler Childers',
                        imageUrl: 'https://i.scdn.co/image/217e3a1144803f8de815d5273ca574f88d7b87f1'
                    },
                    { name: 'Wolf', artists: 'Tyler, The Creator', imageUrl: 'https://i.scdn.co/image/30ab8978adb990daf6b789fba78d64b81bd006b1' },
                    { name: 'Tyler Rich EP', artists: 'Tyler Rich', imageUrl: 'https://i.scdn.co/image/861a87baf5668521160a5c8088bb8d03f3c8fa5d' },
                    { name: 'Cherry Bomb', artists: 'Tyler, The Creator', imageUrl: 'https://i.scdn.co/image/2195afb57828107d5404083a5710e60060998c9e' },
                    {
                        name: 'Live on Red Barn Radio I & II',
                        artists: 'Tyler Childers',
                        imageUrl: 'https://i.scdn.co/image/ac7daf13ed1fde266518b875de31b00aa19523ba'
                    },
                    {
                        name: 'Goblin (Deluxe Edition)',
                        artists: 'Tyler, The Creator',
                        imageUrl: 'https://i.scdn.co/image/d9e3530a3bcd0f3e29866d3aa92070421f0399fa'
                    },
                    {
                        name: 'The Very Best Of Bonnie Tyler',
                        artists: 'Bonnie Tyler',
                        imageUrl: 'https://i.scdn.co/image/d1856dc1efb174700d3bf8c9cb3f3e5c24ede4af'
                    },
                    { name: 'Suffer in Peace', artists: 'Tyler Farr', imageUrl: 'https://i.scdn.co/image/ccdc29a533967d7dfca0381646fb48b3368643fb' },
                    { name: 'House Fire', artists: 'Tyler Childers', imageUrl: 'https://i.scdn.co/image/d1dabe14e73b3f024fb2835fee278b527539c75c' },
                    {
                        name: 'Potato Salad',
                        artists: 'Tyler, The Creator,A$AP Rocky',
                        imageUrl: 'https://i.scdn.co/image/89e999fd39e69c187fa80485a186ba5da72ac3ff'
                    },
                    { name: 'Bottles & Bibles', artists: 'Tyler Childers', imageUrl: 'https://i.scdn.co/image/0ba9ec18ea34ada76a919e7974808e807506e61d' },
                    { name: 'Redneck Crazy', artists: 'Tyler Farr', imageUrl: 'https://i.scdn.co/image/1d68aacfd0ba5ef7f04e00af77eecbb094ef866d' },
                    { name: 'OKRA', artists: 'Tyler, The Creator', imageUrl: 'https://i.scdn.co/image/76be6e6c53bfe2042255582d94b95be6875055d7' },
                    { name: 'Different', artists: 'Micah Tyler', imageUrl: 'https://i.scdn.co/image/d4ac7a3125d73cb2e2293f7f5f65a6f20ba5227a' },
                    {
                        name: 'Secret Dreams And Forbidden Fire',
                        artists: 'Bonnie Tyler',
                        imageUrl: 'https://i.scdn.co/image/428c905a6873448e8c0fdf0ed6b447c228891a96'
                    },
                    {
                        name: 'John Wick: Chapter 3 – Parabellum (Original Motion Picture Soundtrack)',
                        artists: 'Tyler Bates,Joel J. Richard',
                        imageUrl: 'https://i.scdn.co/image/b3742b1718fe61041c161de9ba7ebaa2ec6ff9a4'
                    },
                    {
                        name: 'I Should Go to Church Sometime',
                        artists: 'Tyler Farr',
                        imageUrl: 'https://i.scdn.co/image/e1173c1d2a6153a7b741a10260daefb2550d8ffc'
                    }
                ]
            };
            this.setState({ searchResults: result.data });
        }
    }

    render() {
        return (
            <div>
                <AlbumContext.Provider value={{ handleOnChange: this.albumCheckBoxOnchange }}>
                    <SelectedAlbumList selectedAlbums={this.state.selectedAlbums} />
                    <input type="search" onChange={e => this.onChange(e)} />
                    <SearchedAlbumList searchResults={this.state.searchResults} />
                </AlbumContext.Provider>
            </div>
        );
    }
}
