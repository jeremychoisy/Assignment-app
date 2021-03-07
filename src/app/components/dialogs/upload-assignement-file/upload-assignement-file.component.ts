import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-upload-assignment-file',
  templateUrl: './upload-assignement-file.component.html',
  styleUrls: ['./upload-assignement-file.component.scss']
})
export class UploadAssignementFileComponent {
  private avatarUrl$: Subject<string | undefined> = new Subject<string | undefined>();

  private submitTriggerSubject$: Subject<boolean> = new Subject<boolean>();
  public submitTrigger$: Observable<boolean> = this.submitTriggerSubject$.asObservable();

  constructor(
    private dialogRef: MatDialogRef<UploadAssignementFileComponent>) {
  }

  public onUrlReceived(url?: string): void {
    this.avatarUrl$.next(url);
  }

  public async uploadFile(): Promise<void> {
      this.avatarUrl$.pipe(
        take(1)
      ).subscribe((url) => {
        this.dialogRef.close(url || false);
      });
      this.submitTriggerSubject$.next(true);
  }
}
