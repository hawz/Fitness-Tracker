import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    email: '',
    userId: ''
  };

  constructor() {}

  setUserProperties(uid: string, email: string) {
    this.user.userId = uid;
    this.user.email = email;
  }

  getUser() {
    if (this.user) {
      return this.user;
    }
  }
}
