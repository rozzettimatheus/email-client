import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .signOut()
      .pipe(timeout(2000))
      .subscribe(() => {
        const _ = this.router.navigateByUrl('/');
      });
  }
}
