import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from './http-client-wrapper.service';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {LogInReply} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClientWrapperService: HttpClientWrapperService) {
  }

  public logIn(email: string, password: string): Observable<LogInReply> {
    return this.httpClientWrapperService.post<LogInReply>(apiConfig.baseUrl + '/user/log-in', {email, password});
  }
}
