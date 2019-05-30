import { createContext } from 'react';
import { IAlbum } from '../models/Album';

export type AlbumContextProps = {
    onChangeEvents: {
        check: (album: IAlbum) => void;
        uncheck: (album: IAlbum) => void;
        canCheck: () => boolean;
    };
};

export const AlbumContext = createContext<Partial<AlbumContextProps>>({});

export const ExampleContext = createContext();
