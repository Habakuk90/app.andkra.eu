import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-challenged-modal',
  templateUrl: './modal.challenged.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class ChallengedModalComponent {
  args: any
  @Output() challengeResponse: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  accept() {
    this.challengeResponse.emit('accepted');
  }

  decline() {
    this.challengeResponse.emit('declined');
  }
}
