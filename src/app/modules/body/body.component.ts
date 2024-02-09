import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  @Input() collapsed!:boolean;
  @Input() screenWidth!:number;

  constructor(private router: Router,private renderer: Renderer2){
    
  }
  ngOnInit() {
    this.renderer.addClass(document.body, 'reduced-height');
  }
  
  getBodyClass(): string{

    // console.log(this.screenWidth)

    let styleClass = 'this.screenWidth';
    
    if((this.router.url=='/login')){
      styleClass='body-full'
      this.renderer.removeClass(document.body, 'reduced-height');
    }else if(this.collapsed && this.screenWidth > 834){
      styleClass= 'body-trimmed'
      this.renderer.addClass(document.body, 'reduced-height');
    }else if(!this.collapsed /*&& this.screenWidth<= 835 && this.screenWidth > 0*/){
      styleClass = 'body-md-screen' 
      this.renderer.addClass(document.body, 'reduced-height');
    }
    // styleClass = styleClass;
    return styleClass;
  }

  

}
