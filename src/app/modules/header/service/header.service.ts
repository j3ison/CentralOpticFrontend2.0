import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = new BehaviorSubject<string>("");
  title$ = this.title.asObservable();
  constructor() { }

  setTitle(value:string){
    this.title.next(value);
  }


}
