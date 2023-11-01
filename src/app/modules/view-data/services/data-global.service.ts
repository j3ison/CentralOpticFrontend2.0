import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGlobalService {
  private typeViewIcon = new BehaviorSubject<boolean>(true);
  $typeViewIcon = this.typeViewIcon.asObservable();

  private itemView = new BehaviorSubject<any>(null);
  $itemView = this.itemView.asObservable();

  constructor() { }

  setTypeViewIcon(type:boolean){
    this.typeViewIcon.next(type);
  }

  setItemView(item:any){
    this.itemView.next(item);
  }
}
