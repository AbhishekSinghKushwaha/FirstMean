import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Signup } from './signup.model';

@Injectable()
export class signupService {
  selectedsignup: Signup;
  signup: Signup[];
  readonly baseURL = 'http://localhost:3000/signupdetails';

  constructor(private http: HttpClient) { }

  postSignup(sig: Signup) {
    return this.http.post(this.baseURL, sig);
  }

  getSignupList() {
    return this.http.get(this.baseURL);
  }

  putSignup(sig: Signup) {
    return this.http.put(this.baseURL + `/${sig._id}`, sig);
  }

  deleteSignup(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}