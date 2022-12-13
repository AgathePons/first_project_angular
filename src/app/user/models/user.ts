export class User {
  private _id?: number;
  private _login: string = '';

  public get id(): number {
    return this._id!;
  }
  public set id(id: number) {
    this._id = id;
  }

  public get login(): string {
    return this._login;
  }
  public set login(login: string) {
    this._login = login;
  }
}
