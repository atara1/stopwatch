import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimerPipe } from './pipes/timer.pipe';
import { PresentListOfTimerComponent } from './components/present-list-of-timer/present-list-of-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerPipe,
    PresentListOfTimerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
