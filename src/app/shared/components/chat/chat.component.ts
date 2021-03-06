import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { ChatHubConnection } from 'src/app/connections/chat.hubconnection';
import { ModalService } from '../../modals/modal.service';
import { InfoModal, DecisionModal } from '../../modals/modal';
import { HubFactory } from 'src/app/connections/hub.factory';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, HubComponent {
  private nativeElement: HTMLElement;
  public message = '';
  public history: Array<string> = [];
  public hub: ChatHubConnection;

  constructor(private element: ElementRef, private modalService: ModalService) {
    this.nativeElement = this.element.nativeElement as HTMLElement;
  }

  public get isOpen() {
    return this.nativeElement.classList.contains('open');
  }

  public set isOpen(value: boolean) {
    const classList = this.nativeElement.classList;
    if (value) {
      classList.add('open');
    } else {
      classList.remove('open');
    }
  }

  public get isOnline() {
    return this.hub.isConnected.value;
  }

  isDismissed = false;

  dismissChat(event: Event) {
    // prevent opening chat
    event.stopPropagation();

    // unregister remove stuff that is depenent on the chat.
    this.isDismissed = true;
    this.hub.stopConnection().then(() => {
    });

    // open new moda
    this.modalService.openModal(new DecisionModal());

  }

  closeChat(event: Event) {
    this.isOpen = false;
  }

  openChat(event: Event) {
    this.isOpen = true;
  }

  maximizeChat(event: Event) {
    console.log('maximized');
  }

  minimizeChat(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('minimized');
  }

  onSubmit(form) {
    if (this.message !== '') {
      this.hub.broadcastMessage(this.message).then(() => {
        this.message = '';
      });
    }
  }


  ngOnInit() {
    this.hub = new HubFactory('chat').createConnection(ChatHubConnection);
    // fix me, have to call it in every HubComponent
    this.registerOnMethods();
    this.hub.isConnected.subscribe(isConnected => {
      if (isConnected) {

        this.hub.broadcastMessage('#dings connected with id:' + this.hub.getId());
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.hub.stopConnection();
  }
  registerOnMethods() {
    this.hub.onSendMessage((message: string) => {
      this.history.push(message);
    });
  }
}
