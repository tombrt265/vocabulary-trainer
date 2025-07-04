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

  getAllVocabulary(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.wordPairUrl);
  }

  addVocabulary(wordPair: WordPair): Observable<WordPair> {
    return this.http.post<WordPair>(this.wordPairUrl, wordPair);
  }

  deleteVocabulary(id: string) {
    return this.http.delete(`${this.wordPairUrl}/${id}`);
  }

  editVocabulary(wordPair: WordPair) {
    return this.http.put(`${this.wordPairUrl}/${wordPair.id}`, wordPair);
  }
}
