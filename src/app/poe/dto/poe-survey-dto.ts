export class PoeSurveyDto {

    public id?: number;
    public title: string = '';
    public beginDate: Date = new Date();
    public endDate: Date = new Date();
    public type: string = '';
    public status1?: boolean;
    public sentDate1?: Date ;
    public link1: string = '';
    public status6?: boolean;
    public sentDate6?: Date ;
    public link6: string = '';
    public status12?: boolean;
    public sentDate12?: Date ;
    public link12: string = '';
    public nextTaskDate: Date = new Date();

}
