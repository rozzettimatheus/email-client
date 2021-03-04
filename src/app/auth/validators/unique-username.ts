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

    /**
     * when the function was called, 'this' is undefined
     * change function to arrow function
     */
    // console.log(this.http);

    /**
     * angular manages request cancellation
     */
    return this.authService.usernameAvailable(username).pipe(
      // map -> transform value
      map(() => null), // if not error, return null (available:true)
      catchError((err: HttpErrorResponse) => {
        return err.status
          ? of({ nonUniqueUsername: true })
          : of({ noConnection: true });
      })

      /**
       * long syntax
       */
      // catchError(
      //   (err) =>
      //     new Observable((observer) => {
      //       observer.next({ nonUniqueUsername: true });
      //       observer.complete();
      //     })
      // )
    );
  };
}
