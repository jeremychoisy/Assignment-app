import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {CreateData} from '../../utils/createData';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  @Input()
  public currentAssignment?: Assignment;
  private sub: any;

  constructor(private route: ActivatedRoute, private createDataUtils: CreateData) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.getAssignmentById(params.id);
      // In a real app: dispatch action to load the details here.
    });

  }

  getAssignmentById(id: string): void {
    this.createDataUtils.assignmentsList.forEach(assignment => {
        if (assignment._id === id) {
          this.currentAssignment = assignment;
        }
      }
    );
  }

}
