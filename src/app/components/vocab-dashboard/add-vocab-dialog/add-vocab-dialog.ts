import { Component, inject, signal } from '@angular/core';
import { VocabCard } from '../vocab-card/vocab-card';
import { MatDialogRef } from '@angular/material/dialog';
import { WordPair } from '../../../models/word-pair';

@Component({
  selector: 'app-add-vocab-dialog',
  imports: [VocabCard],
  templateUrl: './add-vocab-dialog.html',
  styleUrl: './add-vocab-dialog.scss',
})
export class AddVocabDialog {
  readonly dialogRef = inject(MatDialogRef);
  wordPair = signal<WordPair>({ original: '', translation: '' });
  
  closeDialog() {
    this.dialogRef.close();
  }
}
