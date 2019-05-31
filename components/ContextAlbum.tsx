import React from 'react';
import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { UIDConsumer } from 'react-uid';
import { AlbumContext } from '../contexts/album';

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

type Props = {
    album: IAlbum;
};

export const ContextAlbum: React.FunctionComponent<Props> = (props: { album: IAlbum }) => {
    return (
        <AlbumLi>
            <UIDConsumer>
                {id => (
                    <div>
                        <AlbumContext.Consumer>
                            {({ handleOnChange: handleOnchange }) => {
                                return (
                                    <div>
                                        <AlbumCheckbox type='checkbox' id={id} onChange={e => handleOnchange(e, props.album)} />
                                        <AlbumLabel htmlFor={id}>
                                            <AlbumTitle>{props.album.name}</AlbumTitle>
                                            <AlbumArtists>{props.album.artists}</AlbumArtists>
                                            <AlbumImg src={props.album.imageUrl} />
                                        </AlbumLabel>
                                    </div>
                                );
                            }}
                        </AlbumContext.Consumer>
                    </div>
                )}
            </UIDConsumer>
        </AlbumLi>
    );
};
