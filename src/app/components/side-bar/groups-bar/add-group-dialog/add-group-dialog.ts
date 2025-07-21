import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Bucket } from '../../../../models/bucket';

@Component({
  selector: 'app-add-group-dialog',
  imports: [FormsModule],
  templateUrl: './add-group-dialog.html',
  styleUrl: './add-group-dialog.scss',
})
export class AddBucketDialog {
  private readonly dialogRef = inject(MatDialogRef);

  readonly bucket = signal<Bucket>({ id: '', name: '' });

  addBucket() {
    this.dialogRef.close(this.bucket());
  }

  updateBucket(newName: string) {
    this.bucket.update((current) => ({
      ...current,
      name: newName,
    }));
  }
}
