export class AnswerUpdateDto {


    public id?: number;
    public text: string = '';

    public constructor(id:number , text: string) {
        this.text = text
        this.id = id


      }}
