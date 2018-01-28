import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  API_URL = environment.api_url;
  FILES_URL = `${this.API_URL}/api/files/`;
  FILE_URL = `${this.API_URL}/api/file/`;


  getFiles(): Observable<any> {
    return this.httpClient.get(this.FILES_URL);
  }

}
