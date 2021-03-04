import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly matchPassword: MatchPassword,
    private readonly uniqueUsername: UniqueUsername,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        // angular checks all sync validators, then the async ones
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-z0-9]+$/),
          ],
          [this.uniqueUsername.validate]
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
      },
      {
        validators: [this.matchPassword.validate],
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.signUp(this.form.value).subscribe({
      // next() {
      //   this => subscriber
      // }
      next: ({ username }) => {
        // this => SignupComponent (binded with arrow)
        // Navigate to some other route
        const _ = this.router.navigateByUrl('/inbox');
      },
      error: (err: HttpErrorResponse) => {
        if (!err.status) {
          this.form.setErrors({ noConnection: true });
        } else {
          this.form.setErrors({ unknownError: true });
        }
      },
    });
  }
}
