import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VocabCard } from './vocab-card/vocab-card';
import { WordPair } from '../../models/word-pair';
import { VocabularyService } from '../../services/vocabulary-service';
import { Subject, switchMap } from 'rxjs';
import { VocabDialog } from './vocab-dialog/vocab-dialog';

@Component({
  selector: 'app-vocab-dashboard',
  imports: [VocabCard],
  templateUrl: './vocab-dashboard.html',
  styleUrl: './vocab-dashboard.scss',
})
export class VocabDashboard {
  private readonly vocabularyService = inject(VocabularyService);
  private readonly dialog = inject(MatDialog);

  vocabularyList = signal<WordPair[]>([]);
  fetchAllVocabularyData$ = new Subject<void>();

  constructor() {
    this.fetchAllVocabularyData$
      .pipe(switchMap(() => this.vocabularyService.getAllVocabulary()))
      .subscribe((data) => {
        this.vocabularyList.set(data);
      });
    this.fetchAllVocabularyData$.next();
  }

  openAddDialog() {
    this.dialog
      .open(VocabDialog, {
        data: { original: '', translation: '' },
        panelClass: 'vocab-dialog',
      })
      .afterClosed()
      .subscribe((newWordPair) => {
        if (newWordPair) {
          this.vocabularyService.addVocabulary(newWordPair).subscribe(() => {
            this.fetchAllVocabularyData$.next();
          });
        }
      });
  }

  deleteVocabCard(wordPair: WordPair) {
    this.vocabularyService.deleteVocabulary(wordPair.id!).subscribe(() => {
      this.fetchAllVocabularyData$.next();
    });
  }

  editVocabulary(wordPair: WordPair) {
    this.vocabularyService.editVocabulary(wordPair).subscribe(() => {
      this.fetchAllVocabularyData$.next();
    });
  }
}
