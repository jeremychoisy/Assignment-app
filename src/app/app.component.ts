import {Component} from '@angular/core';
import {AssignmentApiService} from './services/index';
import {Observable} from 'rxjs';
import {Assignment} from './models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Testing
  public assignmentTest$: Observable<Assignment>;
  constructor(private assignmentApiService: AssignmentApiService) {
    this.assignmentTest$ = this.assignmentApiService.getAssignment('5ffa5d5f5c3abb756433809a');
  }
}
