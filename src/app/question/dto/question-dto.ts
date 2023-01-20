export class QuestionDto {
  public id?: number;
  public text: string = '';
  public answerType: string = '';
  public orderInSurvey: number = 0;

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}
