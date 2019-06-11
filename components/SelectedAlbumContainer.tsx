import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { ContextAlbum } from './ContextAlbum';

const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
`;

export const SelectedAlbumContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 150px;
    height: 150px;
`;

export const SelectedAlbumList = (props: { selectedAlbums: IAlbum[] }) => (
    <AlbumUl>
        {props.selectedAlbums.map(album => (
            <ContextAlbum album={album} key={album.id}/>
        ))}
    </AlbumUl>
);
