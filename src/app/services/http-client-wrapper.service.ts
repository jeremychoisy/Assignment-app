import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {
  constructor(private httpClient: HttpClient) {
  }

  private buildAuthorizationHeader(): { headers: { [header: string]: string | string[] } } | {} {
    const token = sessionStorage.getItem('token');
    return token && {headers: {Authorization: 'Bearer ' + token}} || {};
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.buildAuthorizationHeader());
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body, this.buildAuthorizationHeader());
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url, this.buildAuthorizationHeader());
  }
}
