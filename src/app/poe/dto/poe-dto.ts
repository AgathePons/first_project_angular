import { Stagiaire } from "src/app/core/models/stagiaire";

export class PoeDto {
  public id?: number;
  public title: string = '';
  public beginDate: Date = new Date();
  public endDate: Date = new Date();
  public type: string = '';
  public trainees: Array<Stagiaire> = [];

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}
