import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

import { Artist, Album, Track, Page } from '../objects';

interface Single {
  data: any;
  type: string;
  error: any;
}

interface Collection {
  data: any[];
  type: string;
  error: any;
  index: number;
  offset: number;
  total: number;
}

@Injectable()
export class MetadataService {

  constructor(private http: HttpClient) { }

  // artist api

  getArtists(): Observable<Page> {
    return this.http.get<Collection>(environment.apiServer + '/artists')
      .map(result => new Page(result.data, result.index));
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Single>(environment.apiServer + '/artists', artist)
      .map(result => result.data);
  }

  deleteArtist(artist: Artist): Observable<boolean> {
    return this.http.delete<Single>(environment.apiServer + '/artists/' + artist._id)
      .map(result => result.data);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Single>(environment.apiServer + '/artists/' + artist._id, artist)
      .map(result => result.data);
  }

  getArtistByKeyword(keyword: string): Observable<Artist[]> {
    return this.http.get<Single>(environment.apiServer + '/artists/keyword/' + keyword)
      .map(result => result.data);
  }

  // album api

  getAlbums(): Observable<Page> {
    return this.http.get<Collection>(environment.apiServer + '/albums')
      .map(result => new Page(result.data, result.index));
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Single>(environment.apiServer + '/albums', album)
      .map(result => result.data);
  }

  deleteAlbum(album: Album): Observable<boolean> {
    return this.http.delete<Single>(environment.apiServer + '/albums/' + album._id)
      .map(result => result.data);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Single>(environment.apiServer + '/albums/' + album._id, album)
      .map(result => result.data);
  }

  getAlbumByKeyword(keyword: string): Observable<Album[]> {
    return this.http.get<Single>(environment.apiServer + '/albums/keyword/' + keyword)
      .map(result => result.data);
  }

  addTrackToAlbum(albumId: string, tracks: any): Observable<Album> {
    return this.http.post<Single>(environment.apiServer + '/albums/' + albumId + '/tracks', tracks)
      .map(result => result.data);
  }

  removeTrackFromAlbum(albumId: string, trackId: string): Observable<Album> {
    return this.http.delete<Single>(environment.apiServer + '/albums/' + albumId + '/tracks/' + trackId)
      .map(result => result.data);
  }

  // track api

  getTracks(): Observable<Page> {
    return this.http.get<Collection>(environment.apiServer + '/tracks')
      .map(result => new Page(result.data, result.index));
  }

  addTrack(track: Track): Observable<Track> {
    return this.http.post<Single>(environment.apiServer + '/tracks', track)
      .map(result => result.data);
  }

  updateTrack(track: Track): Observable<Track> {
    return this.http.put<Single>(environment.apiServer + '/tracks/' + track._id, track)
      .map(result => result.data);
  }

  deleteTrack(track: Track): Observable<Track> {
    return this.http.delete<Single>(environment.apiServer + '/tracks/' + track._id)
      .map(result => result.data);
  }

  getTrackByKeyword(keyword: string): Observable<Track> {
    return this.http.get<Single>(environment.apiServer + '/tracks/keyword/' + keyword)
      .map(result => result.data);
  }

  private errorHandler(err) {
  }

}
