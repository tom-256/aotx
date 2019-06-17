import { Album } from './Album';

export type SearchResult = {
    albums: Album[];
    next: string | null;
} | null;
