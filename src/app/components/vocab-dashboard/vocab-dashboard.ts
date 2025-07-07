import { Component, inject, signal } from '@angular/core';
import { VocabCard } from './vocab-card/vocab-card';
import { WordPair } from '../../models/word-pair';
import { VocabularyService } from '../../services/vocabulary-service';
import { MatDialog } from '@angular/material/dialog';
import { AddVocabDialog } from './add-vocab-dialog/add-vocab-dialog';

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

  constructor() {
    this.vocabularyService.getAllVocabulary().subscribe((data) => {
      this.vocabularyList.set(data);
      console.log(data);
    });
  }

  openAddDialog() {
    this.dialog
      .open(AddVocabDialog)
      .afterClosed()
      .subscribe((newWordPair) => {
        if (newWordPair) {
          this.vocabularyService.addVocabulary(newWordPair).subscribe();
          const current = this.vocabularyList();
          this.vocabularyList.set([...current, newWordPair]);
        }
      });
  }
}
