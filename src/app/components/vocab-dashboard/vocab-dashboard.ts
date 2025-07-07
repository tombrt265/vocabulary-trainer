import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VocabCard } from './vocab-card/vocab-card';
import { WordPair } from '../../models/word-pair';
import { VocabularyService } from '../../services/vocabulary-service';
import { AddVocabDialog } from './add-vocab-dialog/add-vocab-dialog';
import { Subject, switchMap } from 'rxjs';

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
        console.log(data);
      });
    this.fetchAllVocabularyData$.next();
  }

  openAddDialog() {
    this.dialog
      .open(AddVocabDialog)
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
    this.vocabularyService.deleteVocabulary(wordPair.id!).subscribe();
    this.vocabularyList.update((list) =>
      list.filter((item) => item.id !== wordPair.id)
    );
  }
}
