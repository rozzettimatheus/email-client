import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | boolean {
    return this.authService.signIn$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          const _ = this.router.navigateByUrl('/');
        }
      })
    );
  }
}
