import { inject, Injectable } from '@angular/core';
import { WordPair } from '../models/word-pair';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly wordPairUrl = 'http://localhost:3000/wordpairs';
  private readonly http = inject(HttpClient);

  getAllWordPairs(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.wordPairUrl);
  }
}
