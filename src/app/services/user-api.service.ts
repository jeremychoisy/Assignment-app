import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {GetStudentsForSchoolSubjectReply, GetUserReply, LogInReply} from '../models/index';
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

  public getStudentsForSchoolSubject$(subjectId: string, page: number, pageSize: number): Observable<GetStudentsForSchoolSubjectReply> {
    return this.httpClientWrapperService.get<GetStudentsForSchoolSubjectReply>(apiConfig.baseUrl + '/user/subject/' + subjectId + '?page=' + page + '&pageSize=' + pageSize);
  }

  public getUser$(userId: string): Observable<GetUserReply> {
    return this.httpClientWrapperService.get<GetUserReply>(apiConfig.baseUrl + '/user/' + userId);
  }

  public approveStudent$(userId: string, subjectId: string): Observable<any> {
    return this.httpClientWrapperService.patch<any>(apiConfig.baseUrl + '/user/approve/' + userId, {subjectId});
  }

  public declineStudent$(userId: string, subjectId: string): Observable<any> {
    return this.httpClientWrapperService.patch<any>(apiConfig.baseUrl + '/user/decline/' + userId, {subjectId});
  }

  public applyStudent$(subjectId: string): Observable<any> {
    return this.httpClientWrapperService.patch<any>(apiConfig.baseUrl + '/user/apply', {subjectId});
  }
}
