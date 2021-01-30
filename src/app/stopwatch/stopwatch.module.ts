import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './components/timer/timer.component';
import { TimerPipe } from './pipes/timer.pipe';
import { PresentListOfTimerComponent } from './components/present-list-of-timer/present-list-of-timer.component';


@NgModule({
  declarations: [
    TimerComponent,
    TimerPipe,
    PresentListOfTimerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimerComponent
  ]
})
export class StopwatchModule { }
