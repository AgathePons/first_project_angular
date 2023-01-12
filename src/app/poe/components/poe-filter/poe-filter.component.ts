import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-poe-filter',
  templateUrl: './poe-filter.component.html',
  styleUrls: ['./poe-filter.component.scss']
})
export class PoeFilterComponent implements OnInit {

  @Input() public filterDate: String | null = null;
  @Output() public onChangeFilter: EventEmitter<String | null> = new EventEmitter<String | null>();

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  constructor( 
    private poeService: PoeService
  ) { }

  ngOnInit(): void {
    this.buttonMap.set('btnAll', true);
    this.buttonMap.set('btnGT1m', false);
    this.buttonMap.set('btnGT6m', false);
    this.buttonMap.set('btnGT1y', false);

    if (this.filterDate === null) {
      this.changeButtonState('btnAll');
    }
    // else if (this.filterDate.getDate() === 31) {
    //   console.log('date:', this.filterDate.getDate());
    //   this.changeButtonState('btnGT1y');
    // } else {
    //   this.changeButtonState('btnGT6m');
    // }
  }

  public getButtonState(key: string): boolean {
    return this.buttonMap.get(key)!;
  }

  public changeButtonState(button: string): void {
    this.buttonMap.forEach((_value: boolean, key: string) => {
      if (key === button) {
        this.buttonMap.set(key, true);
      } else {
        this.buttonMap.set(key, false)
      }
    });

    if (button === 'btnAll') {
      this.onChangeFilter.emit(null);
    } else if (button === 'btnGT1y') {
      this.onChangeFilter.emit('oneYear');
    }
    else if (button === 'btnGT6m') {
      this.onChangeFilter.emit('sixMonths');
    }
    else {
      this.onChangeFilter.emit('oneMonth');
    }
  }

}