import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { SearchedAlbum, SelectedAlbum } from './Album';

const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
`;

export const SearchedAlbumList = (props: { searchResults: IAlbum[] }) => (
    <AlbumUl>
        {props.searchResults.map(album => (
            <SearchedAlbum album={album} />
        ))}
    </AlbumUl>
);

export const SelectedAlbumList = (props: { selectedAlbums: IAlbum[] }) => (
    <AlbumUl>
        {props.selectedAlbums.map(album => (
            <SelectedAlbum album={album} />
        ))}
    </AlbumUl>
);