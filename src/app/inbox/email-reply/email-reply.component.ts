import { Component, Input, OnChanges } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
})
export class EmailReplyComponent implements OnChanges {
  @Input() email: Email;

  showModal = false;

  constructor(private emailService: EmailService) {}

  // detect changes on switching email in list
  ngOnChanges() {
    const text = this.email.text.replace(/\n/, '\n>');

    // swap 'to' and 'from'
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n-------- ${this.email.from} wrote:\n> ${text}`,
    };
  }

  onSubmit(email: Email): void {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
