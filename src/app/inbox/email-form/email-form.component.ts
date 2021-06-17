import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
})
export class EmailFormComponent implements OnInit {
  form: FormGroup;

  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;

    this.form = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.emailSubmit.emit(this.form.value);
  }
}
