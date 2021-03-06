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

    public updateSubject$(subjectId: string, name: string, subjectPictureUrl?: string): Observable<CreateSchoolSubjectReply> {
        const formData = new FormData();
        formData.append('name', name);
        if (subjectPictureUrl) {
            formData.append('subjectPictureUrl', subjectPictureUrl);
        }
        return this.httpClientWrapperService.patch<CreateSchoolSubjectReply>(apiConfig.baseUrl + '/subject/' + subjectId, formData);
    }

    public deleteSubject$(subjectId: string): Observable<any> {
        return this.httpClientWrapperService.delete<any>(apiConfig.baseUrl + '/subject/' + subjectId);
    }
}
