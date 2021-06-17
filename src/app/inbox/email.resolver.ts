import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class EmailResolver implements Resolve<Email> {
  constructor(
    private readonly emailService: EmailService,
    private readonly router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Email> {
    const { id } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        const _ = this.router.navigateByUrl('/inbox/not-found');

        return EMPTY;
      })
    );
  }
}
