export class AnswerInputDto {

    public id?: number;
    public text: string = '';

    public constructor(text: string) {
        this.text = text
      }
}
