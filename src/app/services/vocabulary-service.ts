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

  addVocabulary(wordPair: WordPair) {
    this.http
      .post(this.wordPairUrl, wordPair)
      .subscribe((wordPair) => console.log('word pair added: ', wordPair));
  }

  deleteVocabulary(wordPair: WordPair) {
    this.http.delete(this.wordPairUrl, { body: wordPair });
  }

  changeVocabulary(wordPair: WordPair) {
    this.http.put(this.wordPairUrl, wordPair)
  }
}
