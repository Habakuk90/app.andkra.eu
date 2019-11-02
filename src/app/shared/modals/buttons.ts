export interface IButton {
  text: string;
  className: string;
  onClick(func: (event: Event) => void): void;
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

  onClick(func: (event: Event) => void): void {
    func(event);
  }
}
