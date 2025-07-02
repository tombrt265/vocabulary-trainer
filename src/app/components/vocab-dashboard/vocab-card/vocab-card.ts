import { Component, input } from '@angular/core';
import { WordPair } from '../../../models/word-pair';

@Component({
  selector: 'app-vocab-card',
  imports: [],
  templateUrl: './vocab-card.html',
  styleUrl: './vocab-card.scss',
})
export class VocabCard {
  wordPair = input.required<WordPair>();
  empty = input<Boolean>(false);
}
