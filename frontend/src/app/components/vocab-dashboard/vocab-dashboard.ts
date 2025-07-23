import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VocabCard } from './vocab-card/vocab-card';
import { WordPair } from '../../models/word-pair';
import { VocabularyService } from '../../services/vocabulary-service';
import { Subject, switchMap } from 'rxjs';
import { VocabDialog } from './vocab-dialog/vocab-dialog';
import { Bucket } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vocab-dashboard',
  imports: [VocabCard],
  templateUrl: './vocab-dashboard.html',
  styleUrl: './vocab-dashboard.scss',
})
export class VocabDashboard {
  private readonly vocabularyService = inject(VocabularyService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  vocabularyList = signal<WordPair[]>([]);
  fetchVocabularyData$ = new Subject<void>();
  bucket: Bucket = { bucketName: '' };

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.bucket.bucketName = params.get('bucketName') || '';
      this.vocabularyService
        .getVocabularyFromBucketName(this.bucket.bucketName)
        .subscribe((data) => {
          this.vocabularyList.set(data);
        });
    });

    this.fetchVocabularyData$
      .pipe(
        switchMap(() =>
          this.vocabularyService.getVocabularyFromBucketName(
            this.bucket.bucketName
          )
        )
      )
      .subscribe((data) => {
        this.vocabularyList.set(data);
      });
    this.fetchVocabularyData$.next();
  }

  openAddDialog() {
    this.dialog
      .open(VocabDialog, {
        data: {
          original: '',
          translation: '',
          bucketName: this.bucket.bucketName,
        },
        panelClass: 'vocab-dialog',
      })
      .afterClosed()
      .subscribe((newWordPair) => {
        if (newWordPair) {
          this.vocabularyService.addVocabulary(newWordPair).subscribe(() => {
            this.fetchVocabularyData$.next();
          });
        }
      });
  }

  deleteVocabCard(wordPair: WordPair) {
    this.vocabularyService.deleteVocabulary(wordPair.id!).subscribe(() => {
      this.fetchVocabularyData$.next();
    });
  }

  editVocabulary(wordPair: WordPair) {
    this.vocabularyService.editVocabulary(wordPair).subscribe(() => {
      this.fetchVocabularyData$.next();
    });
  }
}
