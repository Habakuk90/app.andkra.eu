import { IButton, Button, IHeader, ModalHeader } from './buttons';

export interface IModal {
  text: string;
  buttons: IButton[];
  header: IHeader;
}

abstract class Modal implements IModal {
  public text: string;
  public buttons: IButton[];
  public header: IHeader;

  constructor(
    initText: string = null,
    customButtoms: IButton[] = []) {

    this.buttons = this.addButtons();
    this.header = this.addHeader();
    this.text = this.addText();
  }

  abstract addButtons(): IButton[];

  abstract addHeader(): IHeader;

  abstract addText(): string;
}

export class DecisionModal extends Modal {

  constructor() {
    super();
  }

  addHeader(): IHeader {
    const header = new ModalHeader();

    header.type = 'alert';
    header.icon = 'alert';

    return header;
  }

  addButtons(): IButton[] {
    const buttons: IButton[] = [];

    const button = new Button();
    button.text = 'OK';
    button.className = 'a-button--accept';
    button.onClick = (event: any) => console.log('ok');

    buttons.push(button);

    const button2 = new Button();
    button2.text = 'Cancel';
    button2.className = 'a-button--decline';
    button2.onClick = (event: any) => console.log(event);
    buttons.push(button2);

    return buttons;
  }

  addText(): string {
    return 'This is a sample alert';
  }
}

export class InfoModal extends Modal {
  constructor() {
    super();
  }

  addHeader(): IHeader {
    const header = new ModalHeader();
    header.type = 'info';
    header.icon = 'info';

    return header;
  }

  addButtons(): IButton[] {
    const buttons: IButton[] = [];
    const button = new Button();
    button.text = 'OK';
    button.className = 'a-button--accept';
    button.onClick = (event: any) => console.log('ok');

    buttons.push(button);

    return buttons;
  }

  addText() {
    return 'This is a sample info';
  }
}
