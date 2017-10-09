import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { Artist, Page } from '../objects';

@Injectable()
export class MetadataService {

  constructor(private http: Http) { }

  getArtists(): Observable<Page> {
    return this.http.get(environment.apiServer + '/artists').map((resp: Response) => {
      if (resp.status !== 200) {
        throw new Error('Failed to get the response of artists.');
      }

      const result = resp.json();

      if (result.error) {
        throw new Error(result.error.status + '-' + result.error.err_msg);
      }

      return result;
    }).map(result => new Page(result.data, result.index));
  }

}
