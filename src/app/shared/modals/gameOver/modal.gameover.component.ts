import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-gameover-modal',
  templateUrl: './modal.gameover.component.html'
})
export class GameOverModalComponent {
  @Output() restartGame: EventEmitter<string> = new EventEmitter<string>();
  args: any;
  constructor(private modalService: ModalService) {

  }

  public tryAgain() {
    this.restartGame.emit();
  }

  public back() {
    this.modalService.closeModal();
  }
}
