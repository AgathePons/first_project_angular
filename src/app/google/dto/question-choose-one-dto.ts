import { QuestionDto } from "./question-dto";

export class QuestionChooseOneDto extends QuestionDto {
  constructor(answers: Array<any>) {
    super();
    this.question.choiceQuestion = {
      type: 'RADIO',
      options: answers
    };
  }
}
