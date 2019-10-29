import { BaseHubConnection } from './base.hubconnection';

enum GameConnectionInvoke {
  BroadcastMessage = 'BroadcastMessage'
}

enum GameConnectionOn {
  SendMessage = 'SendMessage'
}


export class GameHubConnection extends BaseHubConnection {

  invokeMethdos = GameConnectionInvoke;

  onMethods = GameConnectionOn;

  constructor(name: string, public readonly route = 'game') {
    super(name, route);
  }

  public sendAll(...args: any[]): Promise<any> {
    return this.getConnection().invoke(this.invokeMethdos.BroadcastMessage, ...args);
  }

  public onSendMessage(method: (...args: any[]) => void) {
    this.getConnection().on(this.onMethods.SendMessage, method);
  }
}
