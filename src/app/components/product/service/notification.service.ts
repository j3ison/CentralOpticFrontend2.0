import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification = new BehaviorSubject<any[] | null>(null);
  notification$ = this.notification.asObservable();

  constructor(private mydataservices: MyDataServices) { }

  monitorStockChanges(){
    this.mydataservices.getData("producto").subscribe((respuesta: any[]) => {

      const dataFilter = respuesta.filter(obj => obj.stockMinimo !== 0 && obj.stockMinimo > obj.cantidad)

      this.notification.next(dataFilter.length>0?dataFilter:null)
      // console.log('service ' + dataFilter.length)
    }, (error) => {
      
    })
  }



}
