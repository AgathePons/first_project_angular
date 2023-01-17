import { Answer } from "./answer";

export class Question {
  private id: number = 0;
  private text: string = '';
  private answerType: string = '';
  private answers: Array<Answer> = [];
  private orderInSurvey: number = 0;

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getAnswerType(): string {
    return this.answerType;
  }

  public setAnswerType(answerType: string): void {
    this.answerType = answerType;
  }
  
  public getAnswers(): Array<Answer> {
    return this.answers;
  }

  public setAnswers(answers: Array<Answer>): void {
    this.answers = answers;
  }

  public getOrderInSurvey(): number {
    return this.orderInSurvey;
  }

  public setOrderInSurvey(order: number): void {
    this.orderInSurvey = order;
  }
}
