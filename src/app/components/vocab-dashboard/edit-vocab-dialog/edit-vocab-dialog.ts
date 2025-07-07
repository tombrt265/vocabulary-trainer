import { Component, Inject, inject, signal } from '@angular/core';
import { WordPair } from '../../../models/word-pair';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-vocab-dialog',
  imports: [FormsModule],
  templateUrl: './edit-vocab-dialog.html',
  styleUrl: './edit-vocab-dialog.scss',
})
export class EditVocabDialog {
  readonly dialogRef = inject(MatDialogRef);

  wordPair = signal<WordPair>({ original: '', translation: '' });

  constructor(@Inject(MAT_DIALOG_DATA) public data: WordPair) {
    this.wordPair.set(data);
  }

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
}
