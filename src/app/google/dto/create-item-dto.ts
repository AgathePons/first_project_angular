import { QuestionDto } from "./question-dto";

export class CreateItemDto {

  public createItem: any = {
    item: {
      title: '',
      questionItem: null,
    },
    location: {
      index: 0,
    },
  }

}
