import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {AssignmentApiService} from '../../services/index';
import {AssignmentStore, clearMessages, deleteAssignmentFromApi, updateAssignmentFromApi} from '../../store/index';

interface DialogData {
  assignment: Assignment;
}


@Component({
  selector: 'app-assignments-edit',
  templateUrl: './assignments-edit.component.html',
  styleUrls: ['./assignments-edit.component.scss']
})
export class AssignmentsEditComponent {
  public nameForm: FormGroup;
  public subjectForm: FormGroup;
  public submissionDateForm: FormGroup;
  public remarksForm: FormGroup;
  public today: Date;

  constructor(
    private dialogRef: MatDialogRef<AssignmentsEditComponent>,
    private store: Store<AssignmentStore>,
    private assignmentApiService: AssignmentApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.today = new Date();
    this.nameForm = new FormGroup({
      name: new FormControl(data.assignment.name, [Validators.required])
    });
    this.subjectForm = new FormGroup({
      subject: new FormControl({value: data.assignment.subject._id, disabled: true})
    });
    this.submissionDateForm = new FormGroup({
      submissionDate: new FormControl(data.assignment.submissionDate, [Validators.required])
    });
    this.remarksForm = new FormGroup({
      remarks: new FormControl(data.assignment.remarks || '')
    });
  }

  public async updateAssignment(): Promise<void> {
    this.store.dispatch(clearMessages());
    const name = this.nameForm.get('name')?.value;
    const submissionDate = this.submissionDateForm.get('submissionDate')?.value;
    const remarks = this.remarksForm.get('remarks')?.value;

    if (name && submissionDate && this.data.assignment._id) {
      this.store.dispatch(updateAssignmentFromApi({
        call: this.assignmentApiService.updateAssignment$(this.data.assignment._id, name, new Date(submissionDate), remarks)
      }));
    }

    this.dialogRef.close(true);
  }

  public async deleteAssignment(): Promise<void> {
    this.store.dispatch(clearMessages());

    if (this.data.assignment._id) {
      this.store.dispatch(deleteAssignmentFromApi({
        call: this.assignmentApiService.deleteAssignment$(this.data.assignment._id)
      }));
    }

    this.dialogRef.close(true);
  }
}
