import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schedule-app';
  weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  set activatedDay(val: string) {
    this._day = val;
  }

  get activatedDay() {
    return this._day;
  }

  private _day = new Date().toLocaleDateString('ru-Ru', { weekday: 'short' });

  getDay(day: string) {
    this.activatedDay = day;
  }
}
