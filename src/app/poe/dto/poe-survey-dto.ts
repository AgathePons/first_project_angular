export class PoeSurveyDto {

    public id?: number;
    public title: string = '';
    public beginDate: Date = new Date();
    public endDate: Date = new Date();
    public type: string = '';
    public status1: boolean = false;
    public sentDate1: Date = new Date();
    public link1: string = '';
    public status6: boolean = false;
    public sentDate6: Date = new Date();
    public link6: string = '';
    public status12: boolean = false;
    public sentDate12: Date = new Date();
    public link12: string = '';
    public nextTaskDate: Date = new Date();

    public constructor(formValues: any) {
        Object.assign(this, formValues);
    }
}
