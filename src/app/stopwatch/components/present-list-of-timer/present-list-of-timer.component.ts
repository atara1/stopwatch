import { Time } from '../../../../assets/timerTypes';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-present-list-of-timer',
  templateUrl: './present-list-of-timer.component.html',
  styleUrls: ['./present-list-of-timer.component.css']
})
export class PresentListOfTimerComponent {
  @Input() listOfTimer: Time[] = [];
  @Output() deleteTimer = new EventEmitter<Time>();
  constructor() { }

  removeTime(timerToRemove: Time): void {
    this.deleteTimer.emit(timerToRemove);
  }
}
