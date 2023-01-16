export class GoogleToken {
  private _token: string = '';

  public set googleToken(googleToken: string) {
    this._token = googleToken;
  }

  public get googleToken(): string {
    return this._token;
  }
}
