import { inject, Injectable, signal } from '@angular/core';
import { WordPair } from '../models/word-pair';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Bucket } from '../models/bucket';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly vocabUrl = 'http://localhost:3000/vocab';
  private readonly bucketUrl = 'http://localhost:3000/buckets';
  private readonly http = inject(HttpClient);

  fetchAllBuckets$ = new Subject<void>();
  fetchSelectedBucket$ = new Subject<void>();
  selectedBucket = signal<Bucket | null>(null);

  getAllVocabulary(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.vocabUrl);
  }

  getVocabularyFromBucketName(bucketName: string): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(`${this.vocabUrl}/${bucketName}`);
  }

  addVocabulary(wordPair: WordPair): Observable<WordPair> {
    return this.http.post<WordPair>(this.vocabUrl, wordPair);
  }

  deleteVocabulary(id: number) {
    return this.http.delete(`${this.vocabUrl}/${id}`);
  }

  editVocabulary(wordPair: WordPair) {
    return this.http.put(`${this.vocabUrl}/${wordPair.id}`, wordPair);
  }

  getAllBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.bucketUrl);
  }

  addBucket(bucket: Bucket): Observable<Bucket> {
    return this.http.post<Bucket>(this.bucketUrl, bucket);
  }

  deleteBucket(bucket: Bucket) {
    return this.http.delete(`${this.bucketUrl}/${bucket.bucketName}`);
  }
}
