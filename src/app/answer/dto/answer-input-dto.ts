export class AnswerInputDto {

    public id?: number;
    public text: string = '';
    public orderInQuestion: number = 0;

    public constructor(text: string, orderInQuestion: number) {
        this.text = text;
        this.orderInQuestion = orderInQuestion;
      }
}
