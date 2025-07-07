import { Component, inject, input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../models/word-pair';
import { VocabularyService } from '../../../services/vocabulary-service';
import { VocabDashboard } from '../vocab-dashboard';
import { MatDialog } from '@angular/material/dialog';
import { EditVocabDialog } from '../edit-vocab-dialog/edit-vocab-dialog';

@Component({
  selector: 'app-vocab-card',
  imports: [FormsModule],
  templateUrl: './vocab-card.html',
  styleUrl: './vocab-card.scss',
})
export class VocabCard {
  private readonly vocabularyService = inject(VocabularyService);
  private readonly dashboard = inject(VocabDashboard);
  private readonly dialog = inject(MatDialog);

  wordPair = input.required<WordPair>();

  @Output() editVocabulary = new EventEmitter<WordPair>();

  deleteVocabulary() {
    this.vocabularyService.deleteVocabulary(this.wordPair().id!).subscribe();
    this.dashboard.vocabularyList.update((list) =>
      list.filter((item) => item.id !== this.wordPair().id)
    );
  }

  openEditDialog() {
    this.dialog
      .open(EditVocabDialog, { data: this.wordPair() })
      .afterClosed()
      .subscribe((newWordPair) => {
        if (newWordPair) {
          this.editVocabulary.emit(newWordPair);
        }
      });
  }
}
