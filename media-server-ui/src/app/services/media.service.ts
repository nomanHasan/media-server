import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MediaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  API_URL = environment.api_url;
  FILE_URL = `${this.API_URL}/files/`;


  TRACKS_URL = `${this.API_URL}/tracks/`;
  ARTISTS_URL = `${this.API_URL}/artists/`;
  ALBUM_URL = `${this.API_URL}/albums/`;
  GENRES_URL = `${this.API_URL}/genres/`;

  QUERY_URL = `${this.API_URL}/tracks/query`;


  getTracks(): Observable<any> {
    return this.httpClient.get(this.TRACKS_URL);
  }

  getTrackByTab(name): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/${name}/`);
  }

  getArtists(): Observable<any> {
    return this.httpClient.get(this.ARTISTS_URL);
  }

  getAlbums(): Observable<any> {
    return this.httpClient.get(this.ALBUM_URL);
  }

  getGenres(): Observable<any> {
    return this.httpClient.get(this.GENRES_URL);
  }

  getTrackBySingleQuery({field, value}): Observable<any> {
    return this.httpClient.get(this.QUERY_URL, {
      params: new HttpParams().set(field, value)
    });
  }

  getTrackByAlbum(album): Observable<any> {
    return this.httpClient.get(this.QUERY_URL, {
      params: new HttpParams().set('album', album)
    });
  }

  getTrackByArtist(artist): Observable<any> {
    return this.httpClient.get(this.QUERY_URL, {
      params: new HttpParams().set('artist', artist)
    });
  }

  getTrackByGenre(genre): Observable<any> {
    return this.httpClient.get(this.QUERY_URL, {
      params: new HttpParams().set('genre', genre)
    });
  }


}
