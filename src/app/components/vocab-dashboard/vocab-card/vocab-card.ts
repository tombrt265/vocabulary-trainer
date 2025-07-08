import {
  Component,
  inject,
  input,
  Output,
  EventEmitter,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../models/word-pair';
import { MatDialog } from '@angular/material/dialog';
import { VocabDialog } from '../vocab-dialog/vocab-dialog';

@Component({
  selector: 'app-vocab-card',
  imports: [FormsModule],
  templateUrl: './vocab-card.html',
  styleUrl: './vocab-card.scss',
})
export class VocabCard {
  private readonly dialog = inject(MatDialog);

  wordPair = input.required<WordPair>();
  deleteVocabCard = output<WordPair>();
  editVocabulary = output<WordPair>();

  deleteVocabulary() {
    this.deleteVocabCard.emit(this.wordPair());
  }

  openEditDialog() {
    this.dialog
      .open(VocabDialog, { data: this.wordPair() })
      .afterClosed()
      .subscribe((newWordPair) => {
        if (newWordPair) {
          this.editVocabulary.emit(newWordPair);
        }
      });
  }
}
