import { QuestionDto } from "./question-dto";

export class QuestionYesNoDto extends QuestionDto {
  constructor() {
    super();
    this.question.choiceQuestion = {
      type: 'DROP_DOWN',
      options: [
        { value: 'OUI' },
        { value: 'NON' }
      ]
    };
  }
}
