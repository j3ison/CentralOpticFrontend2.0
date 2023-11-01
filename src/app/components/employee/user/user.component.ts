import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  tableColumnsProveedor:TableColumn[] = [
    { label: 'ID Rol', def: 'idRol', dataKey: 'idRol' },
    { label: 'Rol', def: 'rol', dataKey: 'rol' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' }
  ]

  data$:Observable<any>[] = []
  dataItems:any = null;

  @Output() eventClickItems = new EventEmitter<void>();

  constructor(private mydataservices: MyDataServices) { }



  ngOnInit(): void{

    this.mydataservices.getData("rol").subscribe((respuesta: any) => {

      this.data$ = respuesta

    }, (error) => {

      console.log(error)
    })

   
    
  }



  image(rol:string):string {
    return rol==='Super Administrador'?'https://i.pinimg.com/564x/95/f6/86/95f68680ebc28b4ad669966c1f8da574.jpg':
            rol==='Administrador'?'https://i.pinimg.com/564x/b3/62/fd/b362fd9f6c965e3d154645a5260c0d3a.jpg':
            rol=='Optometrista'?'https://i.pinimg.com/564x/26/ab/94/26ab9450b90b2c994322467ec9945961.jpg':
            rol==='Venta'?'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg':'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg'
  }

  onItemClick(data:any) {
    this.dataItems = data
  }

}
