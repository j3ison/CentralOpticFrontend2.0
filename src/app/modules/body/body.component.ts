import { Component, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input() collapsed!:boolean;
  @Input() screenWidth!:number;

  constructor(private router: Router,private renderer: Renderer2){
    
  }
  
  getBodyClass(): string{
    let styleClass = '';
    if(this.screenWidth == 0 && (this.router.url=='/login')){
      styleClass='body-full'
      this.renderer.removeClass(document.body, 'reduced-height');
    }else if(this.collapsed && this.screenWidth > 834){
      styleClass= 'body-trimmed'
      this.renderer.addClass(document.body, 'reduced-height');
    }else if(!this.collapsed && this.screenWidth<= 835 && this.screenWidth > 0){
      styleClass = 'body-md-screen' 
      this.renderer.addClass(document.body, 'reduced-height');
    }
    styleClass = styleClass;
    return styleClass;
  }

}
