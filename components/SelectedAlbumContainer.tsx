import { Album } from '../models/Album';
import styled from 'styled-components';
import { SelectedAlbumItem } from './SelectedAlbumItem';

const SelectedAlbumDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 150px;
    height: 150px;
`;

export const SelectedAlbumContainer = (props: { selectedAlbums: Album[] }) => (
    <SelectedAlbumDiv>
        {props.selectedAlbums.map(album => (
            <SelectedAlbumItem album={album} key={album.id}/>
        ))}
    </SelectedAlbumDiv>
);
