import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {

  percent1: number = 15;
  percent2: number = 25;

  get getPercent1() {
    return `${this.percent1}%`;
  }
  get getPercent2() {
    return `${this.percent2}%`;
  }

}
