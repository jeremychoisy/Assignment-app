import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../models/index';

@Pipe({
  name: 'statusIcon'
})
export class StatusIconPipe implements PipeTransform {

  transform(user: User, subjectId: string): string | undefined {
    return !!user.subjects.find((subject) => subject._id === subjectId) ? 'check_box'
      :
      !!user.requestedSubjects.find((subject) => subject._id === subjectId) ? 'pending_actions' :
        undefined;
  }
}
