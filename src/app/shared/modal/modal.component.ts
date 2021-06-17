import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy, OnInit {
  @Output() dismiss = new EventEmitter();

  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {
    // inject modal to DOM
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }
}
