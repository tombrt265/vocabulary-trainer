import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WordPair } from '../../../models/word-pair';
import { FormsModule } from '@angular/forms';
import { VocabularyService } from '../../../services/vocabulary-service';

@Component({
  selector: 'app-add-vocab-dialog',
  imports: [FormsModule],
  templateUrl: './add-vocab-dialog.html',
  styleUrl: './add-vocab-dialog.scss',
})
export class AddVocabDialog {
  readonly dialogRef = inject(MatDialogRef);
  private readonly vocabService = inject(VocabularyService);
  wordPair = signal<WordPair>({ original: '', translation: '' });

  updateOriginal(newOriginal: string) {
    this.wordPair.update((data) => ({ ...data, original: newOriginal }));
  }

  updateTranslation(newTranslation: string) {
    this.wordPair.update((data) => ({ ...data, translation: newTranslation }));
  }

  addVocabulary() {
    const wp = this.wordPair();
    if (wp.original !== '' && wp.translation !== '') {
      this.vocabService.addVocabulary(this.wordPair());
      this.dialogRef.close(this.wordPair());
    } else {
      this.wordPair.set({ original: 'Empty Input', translation: '' });
    }
  }
}
