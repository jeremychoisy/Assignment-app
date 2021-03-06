import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config/index';
import {CreateSchoolSubjectReply} from '../models/index';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
    providedIn: 'root'
})
export class SchoolSubjectApiService {
    constructor(private httpClientWrapperService: HttpClientWrapperService) {
    }

    public createSubject$(name: string, subjectPictureUrl?: string): Observable<CreateSchoolSubjectReply> {
        const formData = new FormData();
        formData.append('name', name);
        if (subjectPictureUrl) {
            formData.append('subjectPictureUrl', subjectPictureUrl);
        }
        return this.httpClientWrapperService.post<CreateSchoolSubjectReply>(apiConfig.baseUrl + '/subject', formData);
    }
}
