import { Injectable, computed, effect } from '@angular/core';
import FuzzySearch from 'fuzzy-search';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  state = computed(() => this.store.workspace.vfs());
  searcher = new FuzzySearch(this.state(), ['name'], {
    caseSensitive: false,
    sort: true,
  });

  constructor(private store: StoreService) {
    effect(() => {
      this.searcher.haystack = this.state();
    });
  }

  search(query: string) {
    return this.searcher.search(query);
  }
}
