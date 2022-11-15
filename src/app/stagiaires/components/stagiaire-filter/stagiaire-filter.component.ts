import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stagiaire-filter',
  templateUrl: './stagiaire-filter.component.html',
  styleUrls: ['./stagiaire-filter.component.scss']
})
export class StagiaireFilterComponent implements OnInit {

  @Input() public filterDate: Date | null = null;
  @Output() public onChangeFilter: EventEmitter<Date | null> = new EventEmitter<Date | null>();

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  ngOnInit(): void {
    this.buttonMap.set('btnAll', true);
    this.buttonMap.set('btnLT1950', false);
    this.buttonMap.set('btnGT1950', false);

    if (this.filterDate === null) {
      this.changeButtonState('btnAll');
    }
    else if (this.filterDate.getDate() === 31) {
      console.log('date:', this.filterDate.getDate());
      this.changeButtonState('btnGT1950');
    } else {
      this.changeButtonState('btnLT1950');
    }
  }

  public getButtonState(key: string): boolean {
    return this.buttonMap.get(key)!;
  }

  public changeButtonState(button: string): void {
    this.buttonMap.forEach((_value: boolean, key: string) => {
      if(key === button) {
        this.buttonMap.set(key, true);
      } else {
        this.buttonMap.set(key, false)
      }
    });

    if (button === 'btnAll') {
      this.onChangeFilter.emit(null);
    } else if (button === 'btnGT1950') {
      this.onChangeFilter.emit(new Date(1950, 11, 31));
    } else {
      this.onChangeFilter.emit(new Date(1950, 0, 1));
    }
  }
}
