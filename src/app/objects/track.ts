import { Album } from './album';

export class Track {
    trackNumber: number;
    _id: string;
    name: string;
    link: string;
    lyric: string;
    album: Album;
}
