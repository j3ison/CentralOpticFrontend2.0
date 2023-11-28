import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory',
   templateUrl: './inventory.component.html',
   styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  tableColumnsProveedor:TableColumn[] = [
    { label: 'Codigo', def: 'codProducto', dataKey: 'codProducto' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Tipo', def: 'tipoProducto', dataKey: 'tipoProducto' },
    { label: 'Venta', def: 'precioVenta', dataKey: 'precioVenta' },
    { label: 'Compra', def: 'precioCompra', dataKey: 'precioCompra' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
    { label: 'Stock Minimo', def: 'stockMinimo', dataKey: 'stockMinimo' },
    { label: 'Stock Maximo', def: 'stockMaximo', dataKey: 'stockMaximo' }
  ]

  data$:Observable<any>[] = []
  dataItems:any = null;

  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices) {}



  ngOnInit(): void{
    this.form = this.fb.group({
      cantidad: [0],
      codProducto: [''],
      descripcion: [''],
      estado: [true],
      precioCompra: [0],
      precioVenta: [370],
      stockMaximo: [0],
      stockMinimo: [0],
      tipoProducto: ['Reparaciones']
    });

    this.mydataservices.getData("producto").subscribe((respuesta: any) => {
      this.data$ = respuesta
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })
  }

 onSubmit() {
    if (this.form.valid) {
      // The form is valid, so send it to the server
      const data = {
        cantidad: this.form.get('cantidad')?.value,
        codProducto: this.form.get('codProducto')?.value,
        descripcion: this.form.get('descripcion')?.value,
        estado: this.form.get('estado')?.value,
        precioCompra: this.form.get('precioCompra')?.value,
        precioVenta: this.form.get('precioVenta')?.value,
        stockMaximo: this.form.get('stockMaximo')?.value,
        stockMinimo: this.form.get('stockMinimo')?.value,
        tipoProducto: this.form.get('tipoProducto')?.value
      };
  
      this.mydataservices.updateData('producto', data,data.codProducto).then((success) => {
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
    } else {
      // The form is not valid, so show an error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'El formulario no es válido'
      });
    }
  }
  
  onItemClick(data:any) {
    this.dataItems = data
  }

}