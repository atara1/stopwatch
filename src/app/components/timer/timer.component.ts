import { ListTimerService } from './../../services/list-timer.service';
import { Time, TimerState } from './../../../assets/timeType';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';


const DEFAULT_TIMER_STATE: TimerState = {
  counter: 0,
  currentTime: { minutes: '00', seconds: '00', milliseconds: '00' },
  savedTime: [],
  isPaused: true,
  lastPlayTimestamp: Date.now()
};

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  counter: number;
  timerRef: number;
  isPaused = true;
  lastPlayTimestamp: number;
  timer: Time = { minutes: '00', seconds: '00', milliseconds: '00' };
  constructor(private timerListService: ListTimerService) { }

  ngOnInit(): void {

    this.loadDataFromLocalStorage();

    if (!this.isPaused) {
      const lastPlayTimestamp = Date.now() - this.lastPlayTimestamp;
      this.startTimer();
    }
  }

  startTimer(): void {
    console.log(this.isPaused);
    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      this.timer.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
      this.timer.minutes = (Math.floor(this.counter / 60000)).toString();
      this.timer.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
      if (Number(this.timer.minutes) < 10) {
        this.timer.minutes = '0' + this.timer.minutes;
      } else {
        this.timer.minutes = '' + this.timer.minutes;
      }
      if (Number(this.timer.milliseconds) < 10) {
        this.timer.milliseconds = '0' + this.timer.milliseconds;
      } else {
        this.timer.milliseconds = '' + this.timer.milliseconds;
      }
      if (Number(this.timer.seconds) < 10) {
        this.timer.seconds = '0' + this.timer.seconds;
      } else {
        this.timer.seconds = '' + this.timer.seconds;
      }
    }, 10);
  }


  addTime(): void {
    console.log('add');
    const time: Time = { minutes: this.timer.minutes, seconds: this.timer.seconds, milliseconds: this.timer.milliseconds };
    this.timerListService.addTimer(time);
  }
  reset(): void {
    console.log('reset');
    this.pauseWatch();
    this.timer = { ...DEFAULT_TIMER_STATE.currentTime };
    this.counter = DEFAULT_TIMER_STATE.counter;
    this.timerListService.removeAll();
  }

  tooglePlay(): void {
    console.log('play/pause');
    if (this.isPaused) {
      this.playWatch();
    } else {
      this.pauseWatch();
    }
  }

  playWatch(): void {
    this.isPaused = false;
    this.updateTimer();
  }

  pauseWatch(): void {
    this.isPaused = true;
    clearInterval(this.timerRef);
  }

  updateTimer(): void {
    this.startTimer();
  }


  loadDataFromLocalStorage(): void {

    const timeState: TimerState = JSON.parse(localStorage.getItem('timer'))
      || { ...DEFAULT_TIMER_STATE };
    this.timer = timeState.currentTime;
    this.counter = timeState.counter;
    this.isPaused = timeState.isPaused;
    this.lastPlayTimestamp = timeState.lastPlayTimestamp;
  }

  saveToLocalStorage(): void {
    const timerState: TimerState = {
      currentTime: this.timer,
      savedTime: [],
      isPaused: this.isPaused,
      counter: this.counter,
      lastPlayTimestamp: Date.now()
    };

    localStorage.setItem('timer', JSON.stringify(timerState));
  }


  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.saveToLocalStorage();
  }
}
