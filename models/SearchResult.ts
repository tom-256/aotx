import { Album } from './Album';

export type SearchResult = {
    albums: Album[];
    offset: number;
    next: string | null;
} | null;
