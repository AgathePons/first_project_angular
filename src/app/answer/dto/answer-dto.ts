export class AnswerDto {
    public id?: number;
    public text: string = '';
    public orderInQuestion: number = 0;

    public constructor(formValues: any) {
        Object.assign(this, formValues);
      }
    
}
