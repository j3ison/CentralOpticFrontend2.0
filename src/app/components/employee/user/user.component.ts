import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { Product } from '../../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  tableColumnsProveedor: TableColumn[] = [
    { label: 'ID Rol', def: 'idRol', dataKey: 'idRol' },
    { label: 'Rol', def: 'rol', dataKey: 'rol' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' }
  ]

  data$: Observable<any>[] = []
  dataItems: any = null;

  @Output() eventClickItems = new EventEmitter<void>();

  constructor(private mydataservices: MyDataServices) { }



  ngOnInit(): void {

    this.mydataservices.getData("rol").subscribe((respuesta: any) => {

      this.data$ = respuesta

    }, (error) => {

      console.log(error)
    })



  }


  // d() {
  //   const data = {

  //     cantidad:0,
  //     codProducto:"1110-99",
  //     descripcion:"nuevo producto",
  //     estado:true,
  //     precioCompra:0,
  //     precioVenta:370,
  //     stockMaximo:0,
  //     stockMinimo:0,
  //     tipoProducto:"Reparaciones",
  //   }
  //   this.mydataservices.postData('producto', data).then((success) => {
  //     if (success) {

  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Ups...',
  //         text: 'Algo salió mal!',
  //         footer: '<a href="">¿Por qué tengo este problema??</a>'
  //       })
  //       return
  //     }
  //   })
  // }



  image(rol: string): string {
    return rol === 'Super Administrador' ? 'https://i.pinimg.com/564x/95/f6/86/95f68680ebc28b4ad669966c1f8da574.jpg' :
      rol === 'Administrador' ? 'https://i.pinimg.com/564x/b3/62/fd/b362fd9f6c965e3d154645a5260c0d3a.jpg' :
        rol == 'Optometrista' ? 'https://i.pinimg.com/564x/26/ab/94/26ab9450b90b2c994322467ec9945961.jpg' :
          rol === 'Venta' ? 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg' : 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg'
  }

  onItemClick(data: any) {
    this.dataItems = data
  }

}
