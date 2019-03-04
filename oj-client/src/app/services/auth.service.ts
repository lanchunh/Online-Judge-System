import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private IdToken: string;
  private AccessToken: string;
  private ExpiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'UzTsOJDvqST2gvspvsvC6zh7aAjX2IW3',
    domain: 'onlinejugesystem.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile'
  });

  userProfile: any;

  constructor(public router: Router) {
    this.IdToken = '';
    this.AccessToken = '';
    this.ExpiresAt = 0;
  }

  get accessToken(): string {
    return this.AccessToken;
  }

  get idToken(): string {
    return this.IdToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
    if (!this.AccessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(this.AccessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.AccessToken = authResult.accessToken;
    this.IdToken = authResult.idToken;
    this.ExpiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this.IdToken = '';
    this.AccessToken = '';
    this.ExpiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.ExpiresAt;
  }

}
