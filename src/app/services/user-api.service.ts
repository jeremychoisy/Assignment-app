import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {GetStudentsForSchoolSubjectReply, LogInReply} from '../models/index';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient, private httpClientWrapperService: HttpClientWrapperService) {
  }

  public logIn$(email: string, password: string): Observable<LogInReply> {
    return this.httpClient.post<LogInReply>(apiConfig.baseUrl + '/user/log-in', {email, password});
  }

  public getStudentsForSchoolSubject$(subjectId: string): Observable<GetStudentsForSchoolSubjectReply> {
    return this.httpClientWrapperService.get<GetStudentsForSchoolSubjectReply>(apiConfig.baseUrl + '/user/subject/' + subjectId);
  }
}
