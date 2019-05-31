import { createContext } from 'react';
import { IAlbum } from '../models/Album';

export type AlbumContextProps = {
    handleOnChange: (event: React.FormEvent<HTMLInputElement>, target: IAlbum) => void;
};

export const AlbumContext = createContext<Partial<AlbumContextProps>>({});
