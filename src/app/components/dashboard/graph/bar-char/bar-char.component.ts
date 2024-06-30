import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-char',
  templateUrl: './bar-char.component.html',
  styleUrls: ['./bar-char.component.css']
})
export class BarCharComponent {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType:ChartType  = 'bar';
  public barChartLegend:boolean = true;

  public barChartLabels:string[] = [];
 
  public barChartData:any[] = [
    {
      data: [], 
      label: 'Cargando',  
      backgroundColor:'rgba(59, 105, 190, 0.5)'
      }]
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ;
 

  @Input() set setbarChartLabels(labels:string[]){

   
      this.barChartLabels = labels;
    

  }

  @Input() set setdata(data:number[]){

  
      this.barChartData[0].data = data;
    

  }

  @Input() set setLabel(label:string){

      this.barChartData[0].label = label;
    
  }

  @Input() set setbackgroundColor(color:string){

      this.barChartData[0].backgroundColor = color;
  }

  
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
