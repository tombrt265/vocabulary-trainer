import { Component, inject, signal } from '@angular/core';
import { Bucket } from '../../models/bucket';
import { RouterModule } from '@angular/router';
import { VocabularyService } from '../../services/vocabulary-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-default-page',
  imports: [RouterModule],
  templateUrl: './default-page.html',
  styleUrl: './default-page.scss',
})
export class DefaultPage {
  readonly vocabularyService = inject(VocabularyService);
  readonly buckets = signal<Bucket[]>([]);

  constructor() {
    this.vocabularyService.fetchAllBuckets$
      .pipe(switchMap(() => this.vocabularyService.getAllBuckets()))
      .subscribe((buckets) => {
        this.buckets.set(buckets);
      });
    this.vocabularyService.fetchAllBuckets$.next();
  }
}
