import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { Artist, Page } from '../objects';

@Injectable()
export class MetadataService {

  constructor(private http: Http) { }

  getArtists(): Observable<Page> {
    return this.http.get(environment.apiServer + '/artists')
      .map((resp: Response) => {
        return this.checkError(resp);
      })
      .map(result => new Page(result.data, result.index));
  }

  addArtist(artist: Artist): Observable<Artist> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(environment.apiServer + '/artists', JSON.stringify(artist), { headers: headers })
      .map((resp: Response) => {
        return this.checkError(resp).data;
      });
  }

  deleteArtist(artist: Artist): Observable<boolean> {
    return this.http.delete(environment.apiServer + '/artists/' + artist._id)
      .map((resp: Response) => {
        return this.checkError(resp).data;
      });
  }

  updateArtist(artist: Artist): Observable<Artist> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(environment.apiServer + '/artists/' + artist._id, JSON.stringify(artist), { headers: headers })
      .map((resp: Response) => {
        return this.checkError(resp).data;
      });
  }

  private checkError(resp: Response): any {
    if (resp.status !== 200) {
      throw new Error('Failed to get the response.');
    }

    const result = resp.json();

    if (result.error) {
      throw new Error(result.error.status + '-' + result.error.err_msg);
    }

    return result;
  }

}
