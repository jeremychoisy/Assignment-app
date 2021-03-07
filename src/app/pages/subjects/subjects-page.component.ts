import {Component, OnInit} from '@angular/core';
import {MessageStore} from '../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {



  constructor(private store: Store<MessageStore>) {}

  ngOnInit(): void {
  }
}
