import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../models/word-pair';
import { VocabularyService } from '../../../services/vocabulary-service';
import { VocabDashboard } from '../vocab-dashboard';

@Component({
  selector: 'app-vocab-card',
  imports: [FormsModule],
  templateUrl: './vocab-card.html',
  styleUrl: './vocab-card.scss',
})
export class VocabCard {
  wordPair = input.required<WordPair>();
  private readonly vocabService = inject(VocabularyService);
  private readonly dashboard = inject(VocabDashboard);

  deleteVocabulary() {
    this.vocabService.deleteVocabulary(this.wordPair().id!).subscribe();
    this.dashboard.vocabularyList.update((list) =>
      list.filter((item) => item.id !== this.wordPair().id)
    );
  }
}
