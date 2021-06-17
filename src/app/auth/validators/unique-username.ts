import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private readonly authService: AuthService) {}

  validate = (control: FormControl): Observable<ValidationErrors> => {
    const { value: username } = control;

    return this.authService.usernameAvailable(username).pipe(
      map(() => null),
      catchError((err: HttpErrorResponse) => {
        return err.status
          ? of({ nonUniqueUsername: true })
          : of({ noConnection: true });
      })
    );
  };
}
