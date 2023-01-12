export class Question {
  private id: number = 0;
  private text: string = '';
  private answerType: string = '';

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
}
