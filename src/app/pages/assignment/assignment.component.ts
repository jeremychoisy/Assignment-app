import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assignment} from '../../models';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  @Input()
  public currentAssignment!: Assignment;
  private sub: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.getAssignmentById(params.id);
      // In a real app: dispatch action to load the details here.
    });

  }

  getAssignmentById(id: string): void {
    // TODO get assignment by Id
  }

}
