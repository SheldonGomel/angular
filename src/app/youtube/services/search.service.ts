import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from 'app/youtube/models/search-result-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);

  private dataSubject = new BehaviorSubject<Item[]>([]);

  private searchTextSubject = new BehaviorSubject<string>('');

  data$ = this.dataSubject.asObservable();

  toggleVisibility(): void {
    // this.visibilitySubject.next(this.visibilitySubject.value);
    this.visibilitySubject.next(true);
  }

  getVisibility(): Observable<boolean> {
    return this.visibilitySubject.asObservable();
  }

  setData(data: Item[]): void {
    this.dataSubject.next(data);
  }

  getData(): Observable<Item[]> {
    return this.dataSubject.asObservable();
  }

  sortData(dir:number, criteria: 'date' | 'views'): void {
    const currentData = this.dataSubject.value;
    let sortedData;
    const sortCB = (a:Item, b:Item) => {
      switch (criteria) {
        case 'date':
          return (new Date(a.snippet.publishedAt).getTime()
           < new Date(b.snippet.publishedAt).getTime()
            ? 1
            : -1);
        case 'views':
          return (Number(a.statistics.viewCount)
            < Number(b.statistics.viewCount)
            ? 1
            : -1);
        default:
          return 0;
      }
    };
    if (dir === 1) {
      sortedData = currentData.sort((a, b) => sortCB(b, a));
    } else if (dir === 2) {
      sortedData = currentData.sort((a, b) => sortCB(a, b));
    } else return;
    this.dataSubject.next(sortedData);
  }

  setSearchText(text:string): void {
    this.searchTextSubject.next(text);
  }

  getSearchText(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }
}
