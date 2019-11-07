export interface IButton {
  text: string;
  className: string;
  onClick(func: () => void): void;
}

export class Button implements IButton {
  private _text: string;
  private _className: string;

  constructor() {
  }

  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
  }

  public get className(): string {
    return this._className;
  }

  public set className(value: string) {
    this._className = value;
  }

  onClick(func: () => void): void {
    func();
  }
}


export interface IHeader {
  type: string;
  icon: string;
}

export class ModalHeader implements IHeader {
  private _type: string;
  private _icon: string;

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  public get icon(): string {
    return this._icon;
  }

  public set icon(value: string) {
    this._icon = value;
  }
}
