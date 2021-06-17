import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        const _ = this.router.navigateByUrl('/inbox');
      },
      error: ({ error, status }: HttpErrorResponse) => {
        if (error.username || error.password) {
          this.form.setErrors({ credentials: true });
        }

        if (!status) {
          this.form.setErrors({ noConnection: true });
        }
      },
    });
  }
}
