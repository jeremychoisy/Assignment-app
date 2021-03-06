import {Component, Input, OnInit} from '@angular/core';
import {SchoolSubject} from '../../models';

@Component({
  selector: 'app-school-subject',
  templateUrl: './school-subject.component.html',
  styleUrls: ['./school-subject.component.scss']
})
export class SchoolSubjectComponent implements OnInit {

  @Input()
  public currentSchoolSubject!: SchoolSubject;

  constructor() {
  }


  ngOnInit(): void {
  }
}
