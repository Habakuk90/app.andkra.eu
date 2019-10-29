import { Component, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { ChatHubConnection } from 'src/app/connections/chat.hubconnection';
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

  constructor(private element: ElementRef) {
    this.nativeElement = this.element.nativeElement as HTMLElement;
  }

  public get isOpen() {
    return this.nativeElement.classList.contains('open');
  }

  public get isOnline() {
    return this.hub.isConnected.value;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if ((event.target as HTMLElement).id === 'close-button' || !this.isOpen) {
      this.nativeElement.classList.toggle('open');
    }
  }

  onSubmit(event: Event) {
    if (this.message !== '') {
      this.hub.broadcastMessage(this.message);

    }
  }


  ngOnInit() {
    this.nativeElement.classList.toggle('open');
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
