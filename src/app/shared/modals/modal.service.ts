import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { IModal } from './modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeModal = new BehaviorSubject<IModal>(null);
  constructor() {
  }


  openModal(modal: IModal) {
    this.activeModal.next(modal);
  }

  closeModal() {
    this.activeModal.next(null);
  }
}
