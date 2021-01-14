import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiConfig} from '../config';

@Injectable({
  providedIn: 'root'
})
export class UploadApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getSignedRequest(fileName: string, fileType: string): Observable<{ signedRequest: string, url: string }> {
    return this.httpClient.get<{ signedRequest: string, url: string }>(
      apiConfig.baseUrl + '/upload?fileName=' + fileName + '&fileType=' + fileType);
  }

  public uploadFile(file: File, signedRequest: string): Observable<any> {
    return this.httpClient.put(signedRequest, file);
  }
}
