import { createContext } from 'react';
import { IAlbum } from '../models/Album';

type SelectedAlbumContextProps = {
    handleOnClick: (event: React.FormEvent<HTMLInputElement>, target: IAlbum) => void;
};

export const SelectedAlbumContext = createContext<Partial<SelectedAlbumContextProps>>({});
