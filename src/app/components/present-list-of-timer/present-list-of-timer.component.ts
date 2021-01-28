import { Time } from './../../../assets/timeType';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ListTimerService } from './../../services/list-timer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-present-list-of-timer',
  templateUrl: './present-list-of-timer.component.html',
  styleUrls: ['./present-list-of-timer.component.css']
})
export class PresentListOfTimerComponent implements OnInit {
  timerList: Time[];
  constructor(private timerListService: ListTimerService) { }

  ngOnInit(): void {
    this.timerListService.getTimerList().subscribe(timers => {
      this.timerList = timers;
    });
  }

  removeTime(timerToRemove: Time): void {
    console.log('remove');
    this.timerListService.deleteTimer(timerToRemove);

  }

}
