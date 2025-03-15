import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {ISignupVM} from '../models/signup.vm';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  http = inject(HttpClient);

  getSignUp = (): Observable<ISignupVM> =>
    this.http.get<ISignupVM>('/app/sign-up');

  postSignUp = (body: Record<string, unknown>): Observable<void> =>
    this.http.post<void>('/app/sign-up', { body });

}
