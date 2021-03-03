import {Component, Input, OnInit} from '@angular/core';
import {SchoolSubject} from '../../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-school-subject',
  templateUrl: './school-subject.component.html',
  styleUrls: ['./school-subject.component.scss']
})
export class SchoolSubjectComponent implements OnInit {

  @Input()
  public currentSchoolSubject?: SchoolSubject;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  seeMore(): void {
    this.router.navigate(['/assignment', this.currentSchoolSubject?._id]);
  }

}
