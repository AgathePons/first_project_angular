import { Question } from "src/app/core/models/question";

export class SurveyDto {
  public id?: number;
  public title: string = '';
  public level: string = '';
  public poeType: string = '';
  public questions: Array<Question> = [];

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}
