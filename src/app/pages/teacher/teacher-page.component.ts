import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {User} from '../../models/index';
import {clearMessages, MessageStore, selectUser, UserStore} from '../../store/index';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent {
  public user$: Observable<User>;

  constructor(private store: Store<UserStore & MessageStore>) {
    this.user$ = this.store.pipe(
      select(selectUser),
      filter((user): user is User => !!user)
    );
  }

  public onSelectedTabChange(): void {
    this.store.dispatch(clearMessages());
  }
}
