import { Stagiaire } from "./stagiaire";

export class Poe {
  private id: number = 0;
  private title: string = '';
  private beginDate: Date = new Date();
  private endDate: Date = new Date();
  private type: string = '';
  private trainees: Array<Stagiaire> = [];

  /* public constructor(id: number,title: string,bd: Date,ed: Date,type: string) {
    this.id = id;
    this.beginDate = bd;
    this.endDate = ed;
    this.type = type;
    this.title = title
 } */

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

  public getBeginDate(): Date {
    return this.beginDate
  }

  public setBeginDate(beginDate: Date): void {
    this.beginDate = beginDate;
  }

  public getEndDate(): Date {
    return this.endDate
  }

  public setEndDate(endDate: Date): void {
    this.endDate = endDate;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public getType(): string {
    return this.type;
  }

  public getTrainees(): Array<Stagiaire> {
    return this.trainees;
  }

  public setTrainees(trainees: Array<Stagiaire>): void {
    this.trainees = trainees;
  }
}
