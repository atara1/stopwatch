import { Time } from './../../assets/timeType';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListTimerService {
  timerList = new BehaviorSubject<Time[]>([]);
  data = this.timerList.asObservable();
  constructor() { }


  addTimer(timer: Time): void {
    const timerList: Time[] = this.timerList.getValue();
    const isFound = timerList.find(item => {
      if (item.minutes === timer.minutes && item.seconds === timer.seconds && item.milliseconds === timer.milliseconds){
        return item;
      }
    });
    if (!isFound) {
      timerList.push(timer);
    }
    this.timerList.next(timerList);
  }

  deleteTimer(timer: Time): void {
    const timerList: Time[] = this.timerList.getValue();
    timerList.forEach((item, index) => {
      if (item.minutes === timer.minutes && item.seconds === timer.seconds && item.milliseconds === timer.milliseconds) {
        timerList.splice(index, 1);
      }
    });
    this.timerList.next(timerList);
  }

  getTimerList(): Observable<Time[]> {
    return this.data;
  }

  removeAll(): void {
    this.timerList.next([]);
  }
}
