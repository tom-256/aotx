import React from 'react';
import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { UIDConsumer } from 'react-uid';

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

const AlbumTitle = styled.div`
    font-size: 10px;
`;

const AlbumArtists = styled.div`
    font-size: 10px;
`;

const AlbumImg = styled.img`
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

const AlbumCheckbox = styled.input`
    display: none;
    &:checked + label:before {
      content: '✓';
      background-color: grey;
      transform: scale(1);
  }
`;

const AlbumLabel = styled.label`
    border: 1px solid #fff;
    padding: 10px;
    display: block;
    position: relative;
    margin: 10px;
    cursor: pointer;

    &:before {
        background-color: white;
        color: white;
        content: ' ';
        display: block;
        border-radius: 50%;
        border: 1px solid grey;
        position: absolute;
        top: -5px;
        left: -5px;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 28px;
        transition-duration: 0.4s;
        transform: scale(0);
    }
`;

interface IProps {
    albums: IAlbum[];
}

export default class AlbumList extends React.Component<IProps> {
    render() {
        console.log(this.props);
        if (this.props) {
            return (
                <AlbumUl>
                    {this.props.albums.map(album => (
                        <AlbumLi>
                            <UIDConsumer>
                                {id => (
                                    <div>
                                        <AlbumCheckbox type="checkbox" id={id} />
                                        <AlbumLabel htmlFor={id}>
                                            <AlbumTitle>{album.name}</AlbumTitle>
                                            <AlbumArtists>{album.artists}</AlbumArtists>
                                            <AlbumImg src={album.imageUrl} />
                                        </AlbumLabel>
                                    </div>
                                )}
                            </UIDConsumer>
                        </AlbumLi>
                    ))}
                </AlbumUl>
            );
        }
    }
}
