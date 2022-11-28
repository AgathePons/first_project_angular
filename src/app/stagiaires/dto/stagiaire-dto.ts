export class StagiaireDto {
  public lastName: string = '';
  public firstName: string = '';
  public email: string = '';
  public phoneNumber!: string;
  public birthDate! : Date;

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}
