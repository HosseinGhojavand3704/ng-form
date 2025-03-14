import {httpResource} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ISignupVM} from '../models/signup.vm';

@Injectable()
export class AuthService {

  private httpUrl = '/app/sign-up';

  readonly getSignUp = httpResource<ISignupVM>(() => ({
    url: this.httpUrl
  })).asReadonly();

  readonly postSignUp = (body: Record<string, unknown>) =>
    httpResource<void>(() => ({
      url: this.httpUrl,
      method: "POST",
      body
    })).asReadonly();

}
