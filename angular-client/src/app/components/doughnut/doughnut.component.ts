import { Component, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  @Input() title: string = "Sin Titulo";

  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [ [50, 50, 50] ];
  public doughnutChartType: ChartType = 'doughnut';
  
  public colors: Color[] = [
    {backgroundColor: ['#6857E6','#009FEE','#F02059']}
  ];

}
