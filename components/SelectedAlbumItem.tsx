import React from 'react';
import { Album } from '../models/Album';
import styled from 'styled-components';
import { SelectedAlbumContext } from '../contexts/SelectedAlbumContext';

const SelectedAlbumImg = styled.img`
    width: 50px;
    height: 50px;
`;

type Props = {
    album: Album;
};

export const SelectedAlbumItem: React.FunctionComponent<Props> = (props: { album: Album }) => (
    <SelectedAlbumContext.Consumer>
        {({ handleOnClick: handleOnClick }) => {
            return <SelectedAlbumImg src={props.album.imageUrl} onClick={e => handleOnClick(e, props.album)} />;
        }}
    </SelectedAlbumContext.Consumer>
);
