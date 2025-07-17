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

  private fetchAllBucketData$ = new Subject<void>();
  readonly bucketsList = signal<Bucket[]>([]);

  constructor() {
    this.fetchAllBucketData$
      .pipe(switchMap(() => this.vocabularyService.getAllBuckets()))
      .subscribe((data) => {
        this.bucketsList.set(data);
      });
    this.fetchAllBucketData$.next();
  }

  openBucketDialog() {
    this.dialog
      .open(AddBucketDialog)
      .afterClosed()
      .subscribe((newBucket) => {
        if (newBucket) {
          this.vocabularyService.addBucket(newBucket).subscribe(() => {
            this.fetchAllBucketData$.next();
          });
        }
      });
  }
}
