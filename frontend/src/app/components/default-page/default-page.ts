import { Component, input, output } from '@angular/core';
import { Bucket } from '../../models/bucket';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-page',
  imports: [RouterModule],
  templateUrl: './default-page.html',
  styleUrl: './default-page.scss',
})
export class DefaultPage {
  buckets = input.required<Bucket[]>();
  selectedBucket = output<Bucket>();

  onBucketSelect(bucket: Bucket) {
    this.selectedBucket.emit(bucket);
  }
}
