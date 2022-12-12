export class UserDto {
  public login: string = '';
  public password: string = '';
  public stayConnected?: boolean = false;

  public formDeserialize(formData: any): void {
    this.login = formData.userLogin;
    this.password = formData.userPassword;
    this.stayConnected = formData.stayConnected;
  }
}
