import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { HubService } from 'src/app/connections/hub.service';
import { IModal } from './modal';
import { IButton } from './buttons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  activeModal: IModal;
  activeModalSubscription: Subscription;
  selectedGame: string;

  constructor(private modalService: ModalService, private hubService: HubService) {

  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
  }

  ngOnDestroy() {
    this.activeModalSubscription.unsubscribe();
  }

  // onChallengeResponse(status: any) {
  //   const hub: HomeHubConnection = this.hubService.getByType(HomeHubConnection.prototype);
  //   // const hub: HomeHubConnection = this.hubService.getByName('homehub');

  //   // const resp: ChallengeResponse =
  //   //   new ChallengeResponse(this.activeModal.args.enemyUserName, 'tictactoe', status);

  //   if (hub.isConnected.value) {
  //     this.modalService.closeModal();
  //   }
  // }

  closeModal() {
    this.modalService.closeModal();
  }

  onClick(event: Event, button: IButton) {

  }

  gameRestart() {
    throw new Error('not implemented');
  }
}


// for custom modals use this pls
export class ModalBuilder {
  private _text;
  private _modal: IModal;

  constructor(private modal: IModal) {
    this._modal = this.buildModal(this.modal);
  }

  buildModal(modal: IModal): IModal {


    return this._modal;
  }
}
