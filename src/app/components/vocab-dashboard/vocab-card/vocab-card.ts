import { Component, input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
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

  @Output() deleteVocabCard = new EventEmitter<WordPair>();

  deleteVocabulary() {
    this.deleteVocabCard.emit(this.wordPair());
  }
}
