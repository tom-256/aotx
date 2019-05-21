import { IAlbum } from '../models/Album';
import styled from 'styled-components';

const AlbumUl = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style:none;
`;

const AlbumLi = styled.li`
    margin: 12px;
    list-style:none;
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

export const AlbumList = (props: { albums: IAlbum[] }) => (
    <AlbumUl>
        {props.albums.map(album => (
            <AlbumLi>
                <AlbumTitle>{album.name}</AlbumTitle>
                <AlbumArtists>{album.artists}</AlbumArtists>
                <AlbumImg src={album.imageUrl} />
            </AlbumLi>
        ))}
    </AlbumUl>
);

AlbumList.defaultProps = {
    albums: [{ name: '', artists: '', imageUrl: '' }]
};
