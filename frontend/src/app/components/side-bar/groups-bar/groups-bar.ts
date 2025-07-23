import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBucketDialog } from './add-group-dialog/add-group-dialog';
import { VocabularyService } from '../../../services/vocabulary-service';
import { Subject, switchMap } from 'rxjs';
import { Bucket } from '../../../models/bucket';

@Component({
  selector: 'app-groups-bar',
  imports: [],
  templateUrl: './groups-bar.html',
  styleUrl: './groups-bar.scss',
})
export class GroupsBar {
  private readonly dialog = inject(MatDialog);
  private readonly vocabularyService = inject(VocabularyService);

  readonly bucketsList = signal<Bucket[]>([]);

  constructor() {
    this.vocabularyService.fetchAllBuckets$
      .pipe(switchMap(() => this.vocabularyService.getAllBuckets()))
      .subscribe((data) => {
        this.bucketsList.set(data);
      });
    this.vocabularyService.fetchAllBuckets$.next();
  }

  openBucketDialog() {
    this.dialog
      .open(AddBucketDialog)
      .afterClosed()
      .subscribe((newBucket) => {
        if (newBucket) {
          this.vocabularyService.addBucket(newBucket).subscribe(() => {
            this.vocabularyService.fetchAllBuckets$.next();
          });
        }
      });
  }

  onBucketSelect(bucket: Bucket) {
    this.vocabularyService.getVocabularyFromBucketName(bucket.bucketName);
  }

  deleteBucket(bucket: Bucket) {
    this.vocabularyService.deleteBucket(bucket).subscribe(() => {
      this.vocabularyService.fetchAllBuckets$.next();
    });
  }
}
