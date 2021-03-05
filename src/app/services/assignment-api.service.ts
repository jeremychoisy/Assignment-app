import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {Assignment, GetAssignmentsReply} from '../models/index';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
    providedIn: 'root'
})
export class AssignmentApiService {
    constructor(private httpClientWrapperService: HttpClientWrapperService) {
    }

    public getAssignment(id: string): Observable<Assignment> {
        return this.httpClientWrapperService.get<Assignment>(apiConfig.baseUrl + '/assignment/' + id);
    }

    public getAssignments(): Observable<GetAssignmentsReply> {
        return this.httpClientWrapperService.get<GetAssignmentsReply>(apiConfig.baseUrl + '/assignment');
    }
}
