import React from 'react';
import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { UIDConsumer } from 'react-uid';

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
        background-color: gray;
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

interface IAlbumProps {
    album: IAlbum;
    check: (album: IAlbum) => void;
    uncheck: (album: IAlbum) => void;
    canCheck: () => boolean;
}

export default class Album extends React.Component<IAlbumProps, IAlbumState> {
    constructor(props: IAlbumProps) {
        super(props);
    }

    async onChange(event: React.FormEvent<HTMLInputElement>) {
        if (event.target.checked) {
            console.log('this.props.canCheck()')
            console.log(this.props.canCheck())
            if (this.props.canCheck()){
                this.props.check(this.props.album);
            }else{
                event.target.checked = false
            }
        } else {
            this.props.uncheck(this.props.album);
        }
    }

    render() {
        return (
            <UIDConsumer>
                {id => (
                    <div>
                        <AlbumCheckbox type="checkbox" id={id} onChange={e => this.onChange(e)} />
                        <AlbumLabel htmlFor={id}>
                            <AlbumTitle>{this.props.album.name}</AlbumTitle>
                            <AlbumArtists>{this.props.album.artists}</AlbumArtists>
                            <AlbumImg src={this.props.album.imageUrl} />
                        </AlbumLabel>
                    </div>
                )}
            </UIDConsumer>
        );
    }
}
