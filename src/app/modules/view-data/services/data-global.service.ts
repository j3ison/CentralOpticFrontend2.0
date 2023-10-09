import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGlobalService {
  private typeViewIcon = new BehaviorSubject<boolean>(true);
  $typeViewIcon = this.typeViewIcon.asObservable();
  
  constructor() { }

  setTypeViewIcon(type:boolean){
    this.typeViewIcon.next(type);
  }
}
