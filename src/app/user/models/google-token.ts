export class GoogleToken {
  // TODO switch _token private and investigate getter not working
  // TODO then replace in user interceptor to call getter
  public _token: Object = {};

  public set googleToken(googleToken: Object) {
    this._token = googleToken;
  }

  public get googleToken(): Object {
    return this._token;
  }

  public getGoogleTokenTest(): Object {
    return this._token;
  }

 }
