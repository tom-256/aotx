import React from 'react';
import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { SelectedAlbumContext } from '../contexts/SelectedAlbumContext';

const SelectedAlbumImg = styled.img`
    width: 50px;
    height: 50px;
`;

type Props = {
    album: IAlbum;
};

export const SelectedAlbumItem: React.FunctionComponent<Props> = (props: { album: IAlbum }) => (
    <SelectedAlbumContext.Consumer>
        {({ handleOnClick: handleOnClick }) => {
            return <SelectedAlbumImg src={props.album.imageUrl} onClick={e => handleOnClick(e, props.album)} />;
        }}
    </SelectedAlbumContext.Consumer>
);
