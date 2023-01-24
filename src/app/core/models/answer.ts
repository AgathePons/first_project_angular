export class Answer {
  private id: number = 0;
  private text: string = '';
  private orderInQuestion: number = 0;

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

  public getOrderInQuestion(): number {
    return this.orderInQuestion;
  }

  public setOrderInQuestion(order: number): void {
    this.orderInQuestion = order;
  }
}
