export class User {
  private _id?: number;
  private _login: string = '';
  private _token: string = '';
  private _roles: string[] = [];

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

  public set token(token: string) {
    this._token = token;
  }

  public get token(): string {
    return this._token;
  }

  public setRoles(roles: string[]): void {
    this._roles = roles;
  }

  public getRoles(): string[] {
    return this._roles;
  }

}
