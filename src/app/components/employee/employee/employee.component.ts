import { Component, ElementRef } from '@angular/core';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  respuesta: any;
  itemClick: any;

  constructor(private mydataservices: MyDataServices,
    private dataGlobalservice: DataGlobalService
  ) { }

  data$: Observable<any>[] = []

  tableColumnsEmpleado: TableColumn[] = [
    { label: 'Nombres', def: 'nombres', dataKey: 'nombres' },
    { label: 'Apellidos', def: 'apellidos', dataKey: 'apellidos' },
    { label: 'Cédula', def: 'cedula', dataKey: 'cedula' },
    { label: 'Correos', def: 'correos', dataKey: 'correos' },
    { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
    { label: 'Edad', def: 'edad', dataKey: 'edad' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Fecha de nacimiento', def: 'fechaNac', dataKey: 'fechaNac' },
    { label: 'Número de Empleado', def: 'numEmpleado', dataKey: 'numEmpleado' },
    { label: 'Teléfonos', def: 'telefonos', dataKey: 'telefonos' }
  ];

  ngOnInit() {
    this.mydataservices.getData("empleado").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
    })

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item
      if (item) {
      }
    })
  }


  // Declaracion de funciones auxiliares  
  onItemClickActive(data: any) {
    if (this.itemClick !== data) {
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
  }
  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    for (const key in datosProcesados) {
      if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === null) {
        datosProcesados[key] = "Dato no existente";
      }
    }
    return datosProcesados;
  }
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        icon: "success",
        title: "Texto copiado.",
        showConfirmButton: false,
        timer: 1000
      });
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error al copiar.",
        showConfirmButton: false,
        timer: 1000
      });
    });
  }

}
