import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: [ './confirm-modal.component.scss' ],
})
export class ConfirmModalComponent {
  cancelLabel = 'Cancel';

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, confirmLabel: string },
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
