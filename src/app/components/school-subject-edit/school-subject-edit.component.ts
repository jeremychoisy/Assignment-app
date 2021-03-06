import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {SchoolSubject} from '../../models/index';

interface DialogData {
  schoolSubject: SchoolSubject;
}


@Component({
  selector: 'app-assignments-edit',
  templateUrl: './school-subject-edit.component.html',
  styleUrls: ['./school-subject-edit.component.scss']
})
export class SchoolSubjectEditComponent {
  public subjectForm: FormGroup;

  private avatarUrl$: Subject<string | undefined> = new Subject<string | undefined>();

  private submitTriggerSubject$: Subject<boolean> = new Subject<boolean>();
  public submitTrigger$: Observable<boolean> = this.submitTriggerSubject$.asObservable();

  constructor(
    private dialogRef: MatDialogRef<SchoolSubjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.subjectForm = new FormGroup({
      name: new FormControl(data.schoolSubject.name, [Validators.required]),
    });
  }

  public onUrlReceived(url?: string): void {
    this.avatarUrl$.next(url);
  }

  public async updateSubject(): Promise<void> {
    const name = this.subjectForm.get('name')?.value;

    if (name) {
      this.avatarUrl$.pipe(
        take(1)
      ).subscribe((url) => {
        this.dialogRef.close({name, subjectPictureUrl: url || this.data.schoolSubject.subjectPictureUrl});
      });
      this.submitTriggerSubject$.next(true);
    }
  }

  public async deleteSubject(): Promise<void> {
    this.dialogRef.close('delete');
  }
}
