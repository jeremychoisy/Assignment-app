import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {CreateAssignmentReply, GetAssignmentsReply} from '../models/index';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {
  constructor(private httpClientWrapperService: HttpClientWrapperService) {
  }

  public getAssignments$(subjectId: string, isDone: boolean, pageNumber?: number): Observable<GetAssignmentsReply> {
    if (pageNumber !== undefined) {
      return this.httpClientWrapperService.get<GetAssignmentsReply>(apiConfig.baseUrl + '/assignment?subjectId=' + subjectId + '&page=' + pageNumber + '&pageSize=20&isDone=' + isDone);
    } else {
      return this.httpClientWrapperService.get<GetAssignmentsReply>(apiConfig.baseUrl + '/assignment');
    }
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
}
