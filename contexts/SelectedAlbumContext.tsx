import { createContext } from 'react';
import { Album } from '../models/Album';

type SelectedAlbumContextProps = {
    handleOnClick: (event: React.FormEvent<HTMLInputElement>, target: Album) => void;
};

export const SelectedAlbumContext = createContext<Partial<SelectedAlbumContextProps>>({});
