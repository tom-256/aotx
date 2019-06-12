import { createContext } from 'react';
import { Album } from '../models/Album';

type SearchedResultContextProps = {
    handleOnChange: (event: React.FormEvent<HTMLInputElement>, target: Album) => void;
};

export const SearchedResultContext = createContext<Partial<SearchedResultContextProps>>({});
