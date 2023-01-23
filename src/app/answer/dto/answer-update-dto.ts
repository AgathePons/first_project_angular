export class AnswerUpdateDto {


    public id?: number;
    public text: string = '';
    public orderInQuestion: number = 0;

    public constructor(id:number , text: string, orderInQuestion: number) {
        this.text = text
        this.id = id
        this.orderInQuestion = orderInQuestion;


      }}
