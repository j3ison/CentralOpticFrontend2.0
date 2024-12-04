import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-area-char',
  templateUrl: './area-char.component.html',
  styleUrls: ['./area-char.component.css']
})
export class AreaCharComponent {
   // PolarArea
   public polarAreaChartLabels:string[] = [];
   public polarAreaLegend:boolean = true;
   public datasets:any[] =  [{
    label: '',
    data:  [],
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
    ],
    borderColor: [
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
  
   public polarAreaChartType:ChartType = 'polarArea';
  
   
  @Input() set setpolarAreaChartLabels(labels:string[]){

      this.polarAreaChartLabels = labels;

  }

  @Input() set setdata(data:number[]){

      this.datasets[0].data = data;
  }

  @Input() set setLabel(label:string){

      this.datasets[0].label = label;
    
  }
}
