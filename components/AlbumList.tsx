import React from 'react';
import { IAlbum } from '../models/Album';
import Album from '../components/Album';
import styled from 'styled-components';

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
    albums: IAlbum[];
    pushSelectedAlbum: (album: IAlbum) => {};
    popSelectedAlbum: () => {};
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
            console.log('prevState')
            console.log(prevState)
            selectedAlbums: prevState.selectedAlbums.push(checkedAlbum);
        });
    }

    popSelectedAlbum(uncheckedAlbum: IAlbum) {
        const selectedAlbums = this.state.selectedAlbums.filter(album => {
            return album !== uncheckedAlbum;
        });
        this.setState({ selectedAlbums: selectedAlbums });
    }

    render() {
        console.log(this.props);
        if (this.props.albums) {
            return (
                <AlbumUl>
                    {this.props.albums.map(album => (
                        <AlbumLi>
                            <Album album={album} check={this.pushSelectedAlbum.bind(this)} uncheck={this.popSelectedAlbum.bind(this)} />
                        </AlbumLi>
                    ))}
                </AlbumUl>
            );
        } else {
            return (
                <div>no data</div>
            );
        }
    }
}
