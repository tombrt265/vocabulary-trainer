import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordPair } from '../../../models/word-pair';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vocab-dialog',
  imports: [FormsModule],
  templateUrl: './vocab-dialog.html',
  styleUrl: './vocab-dialog.scss',
})
export class VocabDialog {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<WordPair>(MAT_DIALOG_DATA);

  wordPair = signal<WordPair>(this.data);

  updateOriginal(newOriginal: string) {
    this.wordPair.update((data) => ({ ...data, original: newOriginal }));
  }

  updateTranslation(newTranslation: string) {
    this.wordPair.update((data) => ({ ...data, translation: newTranslation }));
  }

  editVocabulary() {
    const wp = this.wordPair();
    if (wp.original !== '' && wp.translation !== '') {
      this.dialogRef.close(wp);
    } else {
      this.wordPair.set({ original: 'Empty Input', translation: '' });
    }
  }

  addVocabulary() {
    const wp = this.wordPair();
    if (wp.original !== '' && wp.translation !== '') {
      this.dialogRef.close(wp);
    } else {
      this.wordPair.set({ original: 'Empty Input', translation: '' });
    }
  }
}
