import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    /**
     * since this.user is a private object
     * returning it directly would be a reference to the
     * private object which then could be modified.
     * In order to prevent this, we use the spread (...) operator
     * and return a brand new object identical to the private object.
     */
    return {...this.user};
  }

  isAuth() {
    return !!this.user !== false;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
