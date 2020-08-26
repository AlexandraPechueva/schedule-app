import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'schedule-app';
  weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  private _today = new Date().toLocaleDateString('ru-Ru', { weekday: 'short' });

  set activatedDay(val: number) {
    this._day = val;
  }

  get activatedDay() {
    return this._day;
  }

  private _day = this.weekDays.indexOf(this._today);

  getDay(day: string) {
    this.activatedDay = this.weekDays.indexOf(day);
  }
}