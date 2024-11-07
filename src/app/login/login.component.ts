import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isBrowser: boolean;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login() {
    if (this.isBrowser) {
      this.auth.loginWithRedirect();
    } else {
      console.warn('Login chamado em um ambiente onde location não está definido.');
    }
  }

  logout() {
    if (this.isBrowser) {
      this.auth.logout({
        logoutParams: { returnTo: this.document.location.origin },
      });
    } else {
      console.warn('Logout chamado em um ambiente onde location não está definido.');
    }
  }
}
