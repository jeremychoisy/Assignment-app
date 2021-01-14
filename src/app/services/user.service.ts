import { Injectable } from '@angular/core';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientWrapperService: HttpClientWrapperService) {}
}
