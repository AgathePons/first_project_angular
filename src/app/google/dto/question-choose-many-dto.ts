import { QuestionDto } from "./question-dto";

export class QuestionChooseManyDto extends QuestionDto {
  constructor(answers: Array<any>) {
    super();
    this.question.choiceQuestion = {
      type: 'CHECKBOX',
      options: answers
    };
  }
}
