import { BaseHubConnection } from 'src/app/connections/base.hubconnection';

enum HubMethods {
  BroadcastMessage = 'BroadcastMessage'
}

enum ClientMethods {
  SendMessage = 'SendMessage'
}

export class ChatHubConnection extends BaseHubConnection {
  connectionMethods: object;

  invokeMethdos = HubMethods;

  onMethods = ClientMethods;

  constructor(name: string, public readonly route = 'chat') {
    super(name, route);
  }

  public broadcastMessage(...args: any[]): Promise<any> {
    return this.getConnection().invoke(this.invokeMethdos.BroadcastMessage, ...args);
  }

  public onSendMessage(method: (...args: any[]) => void) {
    this.getConnection().on(this.onMethods.SendMessage, method);
  }
}
