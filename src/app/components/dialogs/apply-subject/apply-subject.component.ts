import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-update-student-status',
  templateUrl: './apply-subject.component.html',
  styleUrls: ['./apply-subject.component.scss']
})
export class ApplySubjectComponent {
  constructor(
    private dialogRef: MatDialogRef<ApplySubjectComponent>) {
  }

  public onApprove(): void {
    this.dialogRef.close(true);
  }

  public onDecline(): void {
    this.dialogRef.close(false);
  }
}
