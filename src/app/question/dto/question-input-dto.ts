export class QuestionInputDto {

    public id?: number;
  public text: string = '';
  public answerType: string = '';

  public constructor(id:number, text: string, type: string) {
    this.id = id;
    this.text = text;
    this.answerType = type;
  }
}
