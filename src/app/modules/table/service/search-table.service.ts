import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTableService {
  private text = new BehaviorSubject<string>("");
  text$ = this.text.asObservable();
  constructor() { }

  setTextFilter(value:string){
    this.text.next(value);
  }

  cleanTextFilter(){
    this.text.next('');
  }
  
}
