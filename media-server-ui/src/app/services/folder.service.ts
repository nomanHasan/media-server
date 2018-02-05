import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class FolderService {


  API_URL = environment.api_url;
  FILE_URL = `${this.API_URL}/files/`;

  FOLDERS_URL = `${this.API_URL}/folders`;


  constructor(
    private httpClient: HttpClient
  ) { }

  getFolderContent(id?: string): Observable<any> {
    return this.httpClient.get(`${this.FOLDERS_URL}/${id || ''}`);
  }

}
