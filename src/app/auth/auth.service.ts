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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signIn$ = new BehaviorSubject<boolean>(false);

  private readonly rootURL = 'https://api.angular-email.com';

  constructor(private readonly http: HttpClient) {}

  // Subject is hot => will emit values even there are not subscribers

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
        tap(() => {
          // errors are skipped by 'tap' operator
          this.signIn$.next(true);
        })
      );
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post(`${this.rootURL}/auth/signin`, credentials).pipe(
      // tap skip errors
      tap(() => {
        this.signIn$.next(true);
      })
    );
  }

  checkAuth() {
    /**
     * set-cookies -> lost when the page is refreshed (discarded)
     *  -> fixing by adding a third param -> withCredentials: true
     *  -> put that in a http interceptor
     */
    return this.http
      .get<SignedInResponse>(`${this.rootURL}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signIn$.next(authenticated);
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
