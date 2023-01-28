export class QuestionInputDto {

  public id?: number;
  public text: string = '';
  public answerType: string = '';
  public orderInSurvey: number = 0;

  public constructor(id:number, text: string, type: string, orderInSurvey: number) {
    this.id = id;
    this.text = text;
    this.answerType = type;
    this.orderInSurvey = orderInSurvey;
  }
}
