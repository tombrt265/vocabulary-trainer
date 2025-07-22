import { Component, input, Input } from '@angular/core';
import { Bucket } from '../../models/bucket';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-page',
  imports: [RouterModule],
  templateUrl: './default-page.html',
  styleUrl: './default-page.scss',
})
export class DefaultPage {
  @Input() buckets: Bucket[] = [];

  getVocabFromBucket(bucket: Bucket) {
    // vocab-dashboard will handle api call (GET /vocab:bucketName) via OUTPUT
  }
}
