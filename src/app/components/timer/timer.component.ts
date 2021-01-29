import { Time, TimerState } from './../../../assets/timeType';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';


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
  listOfTimer: Time[] = [];
  constructor() { }

  ngOnInit(): void {
    this.loadDataFromLocalStorage();
    if (!this.isPaused) {
      const lastPlayTimestamp = Date.now() - this.lastPlayTimestamp;
      this.startTimer();
    }
  }

  startTimer(): void {
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
    const time: Time = { minutes: this.timer.minutes, seconds: this.timer.seconds, milliseconds: this.timer.milliseconds };
    const isTimerFound = this.isTimerExist(time);
    if (!isTimerFound) {
      this.listOfTimer.push(time);
    }
  }

  isTimerExist(time: Time): boolean {
    const isFound = this.listOfTimer.find(item => {
      if (item.minutes === time.minutes && item.seconds === time.seconds && item.milliseconds === time.milliseconds) {
        return item;
      }
    });
    return isFound ? true : false;
  }

  timerToRemove(timerToRemove): void {
    const timerList: Time[] = [...this.listOfTimer];
    timerList.forEach((item, index) => {
      if (item.minutes === timerToRemove.minutes &&
        item.seconds === timerToRemove.seconds &&
        item.milliseconds === timerToRemove.milliseconds) {
        timerList.splice(index, 1);
      }
    });
    this.listOfTimer = timerList;
  }

  reset(): void {
    this.pauseWatch();
    this.timer = { minutes: '00', seconds: '00', milliseconds: '00' };
    this.counter = 0;
    this.listOfTimer = []; // remove all timers
  }

  tooglePlay(): void {
    if (this.isPaused) {
      this.playWatch();
    }
    else {
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
    this.listOfTimer = timeState.savedTime;
  }

  saveToLocalStorage(): void {
    const timerState: TimerState = {
      currentTime: this.timer,
      savedTime: this.listOfTimer,
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
