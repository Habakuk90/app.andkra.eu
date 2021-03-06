import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoggedIn = false;

  get userName() {
    return this.userService.currentUserName;
  }

  constructor(private userService: UserService) {
    userService._isLoggedInSubject.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
