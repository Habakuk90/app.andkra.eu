import { ModalService } from './modal.service';
import { IButton, Button } from './buttons';


// for custom modals use this pls
export class ModalBuilder {
  private _text;
  private _modal: IModal;

  constructor(private modal: new (text?: string) => IModal, text: string = null) {
    this._modal = new modal(text);
  }

  buildModal(): IModal {
    return this._modal;
  }
}

export interface IModal {
  text: string;
  buttons: IButton[];
  header: any;
  type: string;
  init(): void;
}

abstract class Modal implements IModal {
  private _text: string;
  private _buttons: IButton[];
  private _header: any;
  abstract type: string;
  public readonly service: ModalService;
  constructor(
    initText: string = null,
    customButtoms: IButton[] = []) {
    this._text = initText;
    this._buttons = customButtoms;
  }

  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
  }

  public get buttons(): IButton[] {
    return this._buttons;
  }

  public set buttons(value: IButton[]) {
    this._buttons = value;
  }


  public get header(): any {
    return this._header;
  }

  public set header(value: any) {
    this._header = value;
  }

  abstract init(): void;
}

export class AlertModal extends Modal {
  type = 'alert';
  constructor() {
    super();

    this.init();
  }

  init() {
    this.initButtons();
    this.initText();
  }

  public initButtons() {
    const button = new Button();
    button.text = 'OK';
    button.className = 'a-button--accept';
    button.onClick = (event: any) => console.log('ok');

    (this.buttons as IButton[]).push(button);

    const button2 = new Button();
    button2.text = 'Cancel';
    button2.className = 'a-button--decline';
    button2.onClick = (event: any) => console.log(event);

    (this.buttons as IButton[]).push(button2);
  }

  initText() {
    if (!this.text) {
      this.text = 'This is a sample alert';
    }
  }
}
