import React from 'react';
import { IAlbum } from '../models/Album';
import Album from '../components/Album';
import styled from 'styled-components';

const maxAlbumsCount = 9
const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
`;

const AlbumLi = styled.li`
    margin: 12px;
    list-style-type: none;
`;

interface IAlbumListProps {
    searchResults: IAlbum[];
}

interface IAlbumListState {
    selectedAlbums: IAlbum[];
}

export default class AlbumList extends React.Component<IAlbumListProps, IAlbumListState> {
    constructor(props: IAlbumListProps) {
        super(props);
        this.state = {
            selectedAlbums: []
        }
    }

    pushSelectedAlbum(checkedAlbum: IAlbum) {
        this.setState((prevState: IAlbumListState) => {
            selectedAlbums: prevState.selectedAlbums.push(checkedAlbum);
        });
    }

    removeSelectedAlbum(uncheckedAlbum: IAlbum) {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album !== uncheckedAlbum;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    }

    clearSelectedAlbum() {
        this.setState({selectedAlbums: []})
    }

    render() {
        if (this.props.searchResults) {
            return (
                <AlbumUl>
                    {this.props.searchResults.map(album => (
                        <AlbumLi>
                            <Album album={album} check={this.pushSelectedAlbum.bind(this)} uncheck={this.removeSelectedAlbum.bind(this)} limit={9} selected={this.state.selectedAlbums.length}/>
                        </AlbumLi>
                    ))}
                </AlbumUl>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}
