import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTableService {
  private text = new BehaviorSubject<KeyboardEvent>(new KeyboardEvent('keyup'));
  text$ = this.text.asObservable();
  constructor() { }

  setTextFilter(value:any){
    this.text.next(value);
  }

  cleanTextFilter(){
    this.text.next(new KeyboardEvent('keyup'));
  }
  
}
