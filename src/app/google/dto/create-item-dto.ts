import { ItemDto } from "./item-dto";

export class CreateItemDto {

  public createItem: any = {
    item: {
      title: '',
      questionItem: {
        question: {
          required: true,
          textQuestion: { paragraph: true }
        }
      },
    },
    location: {
      index: 0,
    },
  }

}
