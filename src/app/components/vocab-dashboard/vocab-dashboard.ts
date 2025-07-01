import { Component, inject } from '@angular/core';
import { VocabCard } from './vocab-card/vocab-card';
import { WordPair } from '../../models/word-pair';
import { VocabularyService } from '../../services/vocabulary-service';

@Component({
  selector: 'app-vocab-dashboard',
  imports: [VocabCard],
  templateUrl: './vocab-dashboard.html',
  styleUrl: './vocab-dashboard.scss',
})
export class VocabDashboard {
  private readonly vocabularyService = inject(VocabularyService);
  vocabularyList: WordPair[] = [];

  constructor() {
    this.vocabularyService.getAllWordPairs().subscribe((data) => {
      this.vocabularyList = data;
      console.log(data);
    });
  }
}
