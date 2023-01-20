import { QuestionDto } from "./question-dto";

export class QuestionFreeDto extends QuestionDto {
  constructor() {
    super();
    this.question.textQuestion = { paragraph: true };
  }
}
