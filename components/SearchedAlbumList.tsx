import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { ContextAlbum } from './ContextAlbum';

const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
`;

export const SearchedAlbumList = (props: { searchResults: IAlbum[] }) => (
    <AlbumUl>
        {props.searchResults.map(album => (
            <ContextAlbum album={album} />
        ))}
    </AlbumUl>
);
