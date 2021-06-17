import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  signIn$: BehaviorSubject<boolean>;

  constructor(private readonly authService: AuthService) {
    this.signIn$ = this.authService.signIn$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }
}
