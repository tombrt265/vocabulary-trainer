import { inject, Injectable } from '@angular/core';
import { WordPair } from '../models/word-pair';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bucket } from '../models/bucket';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly wordPairUrl = 'http://localhost:3000/vocab';
  private readonly bucketUrl = 'http://localhost:3000/buckets';
  private readonly http = inject(HttpClient);

  getAllVocabulary(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.wordPairUrl);
  }

  getVocabularyFromBucketName(bucketName: string): Observable<WordPair[]> {
    return this.getAllVocabulary().pipe(
      map((list) => {
        return list.filter((wordPair) => {
          return wordPair.bucketName === bucketName;
        });
      })
    );
  }

  addVocabulary(wordPair: WordPair): Observable<WordPair> {
    return this.http.post<WordPair>(this.wordPairUrl, wordPair);
  }

  deleteVocabulary(id: number) {
    return this.http.delete(`${this.wordPairUrl}/${id}`);
  }

  editVocabulary(wordPair: WordPair) {
    return this.http.put(`${this.wordPairUrl}/${wordPair.id}`, wordPair);
  }

  getAllBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.bucketUrl);
  }

  addBucket(bucket: Bucket): Observable<string> {
    return this.http.post<string>(this.bucketUrl, bucket);
  }

  deleteBucket(bucketName: string) {
    return this.http.delete<void>(`${this.bucketUrl}/${bucketName}`);
  }
}
