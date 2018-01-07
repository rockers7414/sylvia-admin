import { Artist, Track } from './';

export class Album {
  _id: string;
  name: string;
  artist: Artist;
  images: any[];
  tracks: Track[];
}
