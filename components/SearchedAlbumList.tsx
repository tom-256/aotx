import { IAlbum } from '../models/Album';
import styled from 'styled-components';
import { SeachedAlbumItem } from './SeachedAlbumItem';

const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
`;

export const SearchedAlbumList = (props: { searchResults: IAlbum[]; selectedAlbums: IAlbum[] }) => {
    const isSelected = (album: IAlbum): boolean => {
        const hasSelectedAlbums = props.selectedAlbums.length > 0;
        const isSelected = props.selectedAlbums.some(selected => selected.id === album.id);
        if (hasSelectedAlbums && isSelected) return true;
        // console.log('islesected False');
        return false;
    };
    return (
        <AlbumUl>
            {props.searchResults.map(album => (
                <SeachedAlbumItem album={album} key={album.id} isSelected={isSelected(album)} />
            ))}
        </AlbumUl>
    );
};
