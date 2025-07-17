import { inject, Injectable } from '@angular/core';
import { WordPair } from '../models/word-pair';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { Bucket } from '../models/bucket';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly wordPairUrl = 'http://localhost:3000/wordpairs';
  private readonly groupUrl = 'http://localhost:3000/groups';
  private readonly http = inject(HttpClient);

  getAllVocabulary(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.wordPairUrl);
  }

  getVocabularyFromGroupId(groupId: string): Observable<WordPair[]> {
    return this.getAllVocabulary().pipe(
      map((list) =>
        list.filter((wordPair) => {
          wordPair.groupId === groupId;
        })
      )
    );
  }

  addVocabulary(wordPair: WordPair): Observable<WordPair> {
    return this.http.post<WordPair>(this.wordPairUrl, wordPair);
  }

  deleteVocabulary(id: string) {
    return this.http.delete(`${this.wordPairUrl}/${id}`);
  }

  changeVocabulary(wordPair: WordPair) {
    this.http.put(this.wordPairUrl, wordPair);
  }

  getAllBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.groupUrl);
  }

  addBucket(bucket: Bucket): Observable<string> {
    return this.http.post<string>(this.groupUrl, bucket);
  }
}
