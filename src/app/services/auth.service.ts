import {Injectable} from '@angular/core';
import {AuthUser} from '../models/auth-user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClientWrapperService} from './http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = '';
  private user: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private httpClientWrapperService: HttpClientWrapperService) {}

  public login(value: any): Observable<string> {
    const account = value.account;
    const password = value.password;
    return this.httpClientWrapperService.post<AuthUser>(this.url + '/login', {account, password}).pipe(
      map((res) => {
        sessionStorage.setItem('ACCESS_TOKEN', res.access_token);
        return res.account;
      }),
      catchError(() => of(''))
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.user.next('');
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.user.pipe(map((account) => !!account));
  }

}
