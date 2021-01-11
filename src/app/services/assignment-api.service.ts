import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from './http-client-wrapper.service';
import {Observable} from 'rxjs';
import {Assignment} from '../models/index';
import {apiConfig} from '../config/index';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {
  constructor(private httpClientWrapperService: HttpClientWrapperService) {
  }

  public getAssignment(id: string): Observable<Assignment> {
    return this.httpClientWrapperService.get<Assignment>(apiConfig.baseUrl + '/assignment/' + id);
  }

  public getAssignments(): Observable<Assignment[]> {
    return this.httpClientWrapperService.get<Assignment[]>(apiConfig.baseUrl + '/assignment').pipe(
      // TODO: Api models
      map((res: any) => res.assignments)
    );
  }
}
