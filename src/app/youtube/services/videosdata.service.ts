import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from 'app/youtube/models/search-results-block.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'assets/response.json';

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getData(): Observable<Results> {
    return this.http.get<Results>(this.jsonUrl);
  }
}
