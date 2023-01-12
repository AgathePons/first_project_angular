import { Question } from "./question";

export class Survey {
  private id: number = 0;
  private title: string = '';
  private level: string = '';
  private poeType: string = '';
  private questions: Array<Question> = [];

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getLevel(): string {
    return this.level;
  }

  public setLevel(level: string): void {
    this.level = level;
  }

  public getPoeType(): string {
    return this.poeType;
  }

  public setPoeType(poeType: string): void {
    this.poeType = poeType;
  }

  public getQuestions(): Array<Question> {
    return this.questions;
  }

  public setQuestions(questions: Array<Question>): void {
    this.questions = questions;
  }
}
