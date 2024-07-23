import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'app/youtube/models/search-result-item.model';

@Pipe({
  name: 'filterByText',
  standalone: true,
  pure: false,
})
export class FilterByTextPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(items: Item[], searchText: string): Item[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter((item) => {
      const title = item.snippet.title.toLowerCase();
      return title.includes(searchText.toLowerCase());
    });
  }
}
