import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgForm } from '@angular/forms';

interface Record {
  time: string;
  task: string;
  isPassed?: boolean;
}

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})

export class DayScheduleComponent implements OnChanges {
  constructor(private readonly _localStorage: LocalStorageService,
  ) { }

  @Input() activatedDay = 0;
  @ViewChild('todoForm') private readonly _form: NgForm;
  @ViewChild('time') timeInput: ElementRef;
  @ViewChild('task') taskInput: ElementRef;

  weekRecords = this._localStorage.get('weekRecords') || {};
  dayRecords: Record[] = [];

  private _newTimeValue = '';

  ngOnChanges() {
    this._setDayRecords(this.weekRecords, this.activatedDay);
  }

  customTrackBy(index: number): number {
    return index;
  }

  inputFocusOut(i: number) {
    this.weekRecords[this.activatedDay][i].time = this._newTimeValue;
    this._setDayRecords(this.weekRecords, this.activatedDay);
  }

  timeModelChangeFn(value: string) {
    this._newTimeValue = value;
  }

  addTodo(time: string, task: string) {
    if (this._form.invalid) return;

    if (!this.weekRecords[this.activatedDay]) {
      this.weekRecords[this.activatedDay] = [];
    }

    this.weekRecords[this.activatedDay].push(this._makeRecord(time, task))
    this._setDayRecords(this.weekRecords, this.activatedDay);
  }

  deleteItem(record: Record) {
    for (let i = 0; i <= this.dayRecords.length; i++) {
      if (record == this.dayRecords[i]) {
        this.dayRecords.splice(i, 1)
      }
    }
    this._updateLocalStorage(this.weekRecords);
  }

  private _updateLocalStorage(weekRecords: any) {
    this._localStorage.set('weekRecords', weekRecords);
  }

  private _makeRecord(time: string, task: string): Record {
    return <Record>{
      time: time,
      task: task,
      isPassed: this._IsPassed(time),
    };
  }

  private _setDayRecords(weekRecords: any, activatedDay: number) {
    this.dayRecords = weekRecords[activatedDay];

    if (this.dayRecords && this.dayRecords.length > 0) {
      this.dayRecords.sort(this._compare);
    }

    this._updateLocalStorage(weekRecords);
  }

  private _compare(a: Record, b: Record): number {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  private _IsPassed(time: string): boolean {
    const today = new Date();
    const currentDay = today.getDay() - 1;
    const currentTime = today.getHours() + ":" + today.getMinutes();

    return this.activatedDay < currentDay || time < currentTime;
  }
}
