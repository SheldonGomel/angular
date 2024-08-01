import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Results,
  SearchResults,
} from 'app/youtube/models/search-results-block.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private youTubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  private searchApiUrl = 'https://www.googleapis.com/youtube/v3/search';

  private id = [
    'Ata9cSC2WpM',
    'k5E2AVpwsko',
    '3qBXWUpoPHo',
    'a6E5pzst2YE',
    '3dHNOWTI7H8',
    'JWhRMyyF7nc',
    '5xg4Jvqy_UI',
    'w7oljgTfIzM',
    'nQ2A30cD3Q8',
    'L56k-qbb7Ig',
    'f7BJFTEbc10',
    'K9vBpIq8Wck',
    'VTEDh2pNSBQ',
  ].join(',');

  constructor(private http: HttpClient) {}

  searchData(searchText: string): Observable<SearchResults> {
    return this.http.get<SearchResults>(this.searchApiUrl, {
      params: { q: searchText },
    });
  }

  getData(ids: string): Observable<Results> {
    return this.http.get<Results>(this.youTubeApiUrl, { params: { id: ids } });
  }

  getDetailedData(id: string): Observable<Results> {
    return this.http.get<Results>(this.youTubeApiUrl, { params: { id } });
  }
}
