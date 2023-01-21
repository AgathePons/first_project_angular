import { Stagiaire } from "./stagiaire";

export class Poe {
  private id: number = 0;
  private title: string = '';
  private beginDate: Date = new Date();
  private endDate: Date = new Date();
  private type: string = '';
  private trainees: Array<Stagiaire> = [];
  private status1: boolean = false;
  private sentDate1: Date = new Date();
  private link1: string = '';
  private status6: boolean = false;
  private sentDate6: Date = new Date();
  private link6: string = '';
  private status12: boolean = false;
  private sentDate12: Date = new Date();
  private link12: string = '';

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

  public getStatus1(): boolean {
    return this.status1
  }

  public setStatus1(boolean: boolean): void {
    this.status1 = boolean
  }

  public getSentDate1(): Date {
    return this.sentDate1
  }

  public setSentDate1(date: Date): void {
    this.sentDate1 = date
  }
  
  public getLink1(): string {
    return this.link1
  }

  public setLink1(url: string): void {
    this.link1 = url
  }
  
  public getStatus6(): boolean {
    return this.status6
  }

  public setStatus6(boolean: boolean): void {
    this.status6 = boolean
  }

  public getSentDate6(): Date {
    return this.sentDate6
  }

  public setSentDate6(date: Date): void {
    this.sentDate6 = date
  }
  
  public getLink6(): string {
    return this.link6
  }

  public setLink6(url: string): void {
    this.link6 = url
  }
  
  public getStatus12(): boolean {
    return this.status12
  }

  public setStatus12(boolean: boolean): void {
    this.status12 = boolean
  }

  public getSentDate12(): Date {
    return this.sentDate12
  }

  public setSentDate12(date: Date): void {
    this.sentDate12 = date
  }
  
  public getLink12(): string {
    return this.link12
  }

  public setLink12(url: string): void {
    this.link12 = url
  }

}
