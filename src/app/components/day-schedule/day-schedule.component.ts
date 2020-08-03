import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgForm } from '@angular/forms';

interface Record {
  time: string;
  task: string;
}

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})

export class DayScheduleComponent implements OnChanges {
  constructor(private readonly _localStorage: LocalStorageService,
  ) { }

  @Input() activatedDay = '';
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

  timeModelChangeFn(value) {
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
  }

  private _makeRecord(time, task): Record {
    return <Record>{
      time: time,
      task: task,
    };
  }

  private _setDayRecords(weekRecords: any, activatedDay: string) {
    this.dayRecords = weekRecords[activatedDay];

    if (this.dayRecords && this.dayRecords.length > 0) {
      this.dayRecords.sort(this._compare);
    }

    this._localStorage.set('weekRecords', weekRecords);
  }

  private _compare(a, b) {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }
}