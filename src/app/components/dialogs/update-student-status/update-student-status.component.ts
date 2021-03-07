import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-update-student-status',
  templateUrl: './update-student-status.component.html',
  styleUrls: ['./update-student-status.component.scss']
})
export class UpdateStudentStatusComponent {
  constructor(
    private dialogRef: MatDialogRef<UpdateStudentStatusComponent>) {
  }

  public onApprove(): void {
    this.dialogRef.close(true);
  }

  public onDecline(): void {
    this.dialogRef.close(false);
  }
}
