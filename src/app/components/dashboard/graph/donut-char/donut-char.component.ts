import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-donut-char',
  templateUrl: './donut-char.component.html',
  styleUrls: ['./donut-char.component.css']
})
export class DonutCharComponent {
  // Doughnut
  public doughnutChartLabels:string[] = [];
  //public doughnutChartData:ChartData[] = 
  public datasets:any[] =  [{
    label: '',
    data: [],
    hoverOffset: 4,
    backgroundColor: [
      'rgb(133, 193, 233, 0.5)',
      'rgb(174, 214, 241, 0.5)',
      'rgb(214, 234, 248, 0.5)',
      'rgb(235, 245, 251 , 0.5)',
      'rgb(27, 79, 114, 0.5)',
      'rgb(40, 116, 166, 0.5)',
      'rgb(33, 97, 140, 0.5)',
      'rgb(27, 79, 114, 0.5)',
      'rgb(46, 134, 193, 0.5)',
      'rgb(52, 152, 219, 0.5)'
    ]
  }]

  public doughnutChartType:ChartType = 'doughnut';
 
  // events

  @Input() set setdoughnutChartLabels(labels:string[]){
      this.doughnutChartLabels = labels;

  }

  @Input() set setdata(data:number[]){

      this.datasets[0].data = data;

  }

  @Input() set setLabel(label:string){

      this.datasets[0].label = label;
    
  }
 
}
