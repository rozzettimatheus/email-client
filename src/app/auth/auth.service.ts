import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

type SignInCredentials = Omit<SignUpCredentials, 'passwordConfirmation'>;

interface SignUpResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signIn$ = new BehaviorSubject<boolean>(null);
  username = '';

  private readonly rootURL = 'https://api.angular-email.com';

  constructor(private readonly http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootURL}/auth/username`,
      {
        username,
      }
    );
  }

  signUp(credentials: SignUpCredentials) {
    return this.http
      .post<SignUpResponse>(`${this.rootURL}/auth/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signIn$.next(true);
          this.username = username;
        })
      );
  }

  signIn(credentials: SignInCredentials) {
    return this.http
      .post<SignInResponse>(`${this.rootURL}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signIn$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>(`${this.rootURL}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signIn$.next(authenticated);
          this.username = username;
        })
      );
  }

  signOut() {
    return this.http.post(`${this.rootURL}/auth/signout`, {}).pipe(
      tap(() => {
        this.signIn$.next(false);
      })
    );
  }
}
