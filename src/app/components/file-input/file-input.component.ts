import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of, Subscription} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import {UploadApiService} from '../../services/index';
import {MessageStore, pushMessage} from '../../store/message/index';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit, OnDestroy {
  @Input()
  public submitTrigger$: Observable<boolean> = new Observable<boolean>();

  @Input()
  public buttonLabel?: string;

  @Output()
  public receivedUrlEmitter: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  @ViewChild('inputFile', {static: false})
  inputRef?: ElementRef;

  private selectedFile?: File;
  private receivedUrl?: string;

  private subscriptions: Subscription[] = [];

  constructor(private uploadApiService: UploadApiService, private store: Store<MessageStore>) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.submitTrigger$.subscribe(() => {
        if (this.selectedFile) {
          this.uploadApiService.getSignedRequest(this.selectedFile.name, this.selectedFile.type).pipe(
            take(1),
            switchMap((data: { signedRequest: string, url: string }) => {
              this.receivedUrl = data.url;
              return this.selectedFile ?
                this.uploadApiService.uploadFile(this.selectedFile, data.signedRequest).pipe(
                  catchError(() => of(true))
                )
                :
                of(true);
            }),
            catchError(() => of(true))
          ).subscribe((hasFailed: boolean | null) => {
            // Since AWS S3 API response is null when everything went well, the return here is truthy if something failed
            if (hasFailed) {
              this.receivedUrlEmitter.emit(undefined);
              this.store.dispatch(pushMessage({
                message: {
                  type: 'error',
                  content: 'File could not be uploaded, please try again later.'
                }
              }));
            } else {
              this.receivedUrlEmitter.emit(this.receivedUrl);
            }
          });
        }
      })
    );
  }

  public onChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.selectedFile = files && files[0] || undefined;
  }

  public openInput(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.click();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
