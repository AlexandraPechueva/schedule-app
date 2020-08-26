import { Component } from '@angular/core';
import { Day } from './models/day';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'schedule-app';
  weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  set activatedDay(val: Day) {
    this._day = val;
  }

  get activatedDay() {
    return this._day;
  }

  private _day = {
    num: this.weekDays.indexOf(new Date().toLocaleDateString('ru-Ru', { weekday: 'short' })),
    name: new Date().toLocaleDateString('ru-Ru', { weekday: 'short' }),
  }

  getDay(day: string) {
    this.activatedDay = {
      num: this.weekDays.indexOf(day),
      name: day,
    };
  }
}