import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.scss']
})
export class GradeAssignmentComponent {
  public gradeForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<GradeAssignmentComponent>) {
    this.gradeForm = new FormGroup({
      grade: new FormControl('', [Validators.required, Validators.min(0), Validators.max(20)]),
    });
  }

  public onApprove(): void {
    if (this.gradeForm.get('grade')?.value) {
      this.dialogRef.close(this.gradeForm.get('grade')?.value);
    }
  }

  public onDecline(): void {
    this.dialogRef.close();
  }
}
