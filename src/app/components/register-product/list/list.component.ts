import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  tableColumnsProveedor:TableColumn[] = [
    { label: 'Codigo', def: 'codigoProducto', dataKey: 'codigoProducto' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Empresa', def: 'nombreEmpresa', dataKey: 'nombreEmpresa' },
    { label: 'Fecha', def: 'fechaAdquisicion', dataKey: 'fechaAdquisicion' },
    { label: 'Costo', def: 'costo', dataKey: 'costo' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
  ]
  data$:Observable<any>[] = []
  dataItems:any = null;

  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices) {}



  ngOnInit(): void{


    this.mydataservices.getData("registroproducto").subscribe((respuesta: any) => {
      this.data$ = respuesta
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })
  }

 onSubmit() {

      // The form is valid, so send it to the server
      const data = {
        codigoProducto: this.form.get('codProducto')?.value,
        descripcion: this.form.get('descripcion')?.value,
        nombreEmpresa: this.form.get('nombreEmpresa')?.value,
        fechaAdquisicion: this.form.get('fechaAdquisicion')?.value,
        costo: this.form.get('costo')?.value,
        cantidad: this.form.get('cantidad')?.value,
        estado: this.form.get('estado')?.value,
      };
  
      this.mydataservices.updateData('registroproducto', data,data.codigoProducto).then((success) => {
        if (success) {
  
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Algo salió mal!',
            footer: '<a href="">¿Por qué tengo este problema??</a>'
          });
          return;
        }
      });
  }
  
  onItemClick(data:any) {
    this.dataItems = data
  }


}
