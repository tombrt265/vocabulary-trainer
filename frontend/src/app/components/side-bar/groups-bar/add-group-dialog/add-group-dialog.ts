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
  bucket = signal<Bucket>({ bucketName: '' });

  addBucket() {
    if (this.bucket().bucketName.trim() === '') {
      this.bucket.set({ bucketName: 'Empty Bucket' });
      return;
    }
    this.dialogRef.close(this.bucket());
  }

  updateBucket(newName: string) {
    this.bucket.update((current) => ({
      ...current,
      bucketName: newName,
    }));
  }
}
