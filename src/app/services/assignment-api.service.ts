import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {CreateAssignmentReply, GetAssignmentsReply, UpdateAssignmentReply} from '../models/index';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {
  constructor(private httpClientWrapperService: HttpClientWrapperService) {
  }

  public getAssignments$(subjectId: string, isDone: boolean, pageNumber: number): Observable<GetAssignmentsReply> {
      return this.httpClientWrapperService.get<GetAssignmentsReply>(apiConfig.baseUrl + '/assignment?subjectId=' + subjectId + '&page=' + pageNumber + '&pageSize=20&isDone=' + isDone);
  }

    public getRootAssignments$(subjectId: string): Observable<GetAssignmentsReply> {
        return this.httpClientWrapperService.get<GetAssignmentsReply>(apiConfig.baseUrl + '/assignment/root?subjectId=' + subjectId);
    }

    public createAssignment$(name: string, subjectId: string, submissionDate: Date, remarks?: string): Observable<CreateAssignmentReply> {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('subject', subjectId);
        formData.append('submissionDate', submissionDate.toUTCString());
        if (remarks) {
            formData.append('remarks', remarks);
        }
        return this.httpClientWrapperService.post<CreateAssignmentReply>(apiConfig.baseUrl + '/assignment', formData);
    }

    public updateAssignment$(assignmentId: string, name: string, submissionDate: Date, remarks?: string): Observable<UpdateAssignmentReply> {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('submissionDate', submissionDate.toUTCString());
        if (remarks) {
            formData.append('remarks', remarks);
        }
        return this.httpClientWrapperService.patch<UpdateAssignmentReply>(apiConfig.baseUrl + '/assignment/root/' + assignmentId, formData);
    }

    public deleteAssignment$(assignmentId: string): Observable<any> {
        return this.httpClientWrapperService.delete<any>(apiConfig.baseUrl + '/assignment/' + assignmentId);
    }
}
