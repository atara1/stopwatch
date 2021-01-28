import { Time } from './../../assets/timeType';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(timeVal: Time): unknown {
    return `${timeVal.minutes} : ${timeVal.seconds} : ${timeVal.milliseconds}`;
  }

}
