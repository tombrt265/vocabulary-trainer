import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../models/word-pair';

@Component({
  selector: 'app-vocab-card',
  imports: [FormsModule],
  templateUrl: './vocab-card.html',
  styleUrl: './vocab-card.scss',
})
export class VocabCard {
  wordPair = input.required<WordPair>();

  deleteVocabCard = output<WordPair>();

  deleteVocabulary() {
    this.deleteVocabCard.emit(this.wordPair());
  }
}
