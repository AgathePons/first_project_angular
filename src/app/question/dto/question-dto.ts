export class QuestionDto {
  public id?: number;
  public text: string = '';
  public answerType: string = '';

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}
