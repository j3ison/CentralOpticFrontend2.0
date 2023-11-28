import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  data$: Observable<any>[] = [];
  dataItems: any = null;

  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices) {}

  ngOnInit() {
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
      
     

      this.mydataservices.postData('producto', data).then((success) => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se ha ingresado el registro correctamente',
          })
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

  image(rol: string): string {
    return rol === 'Super Administrador' ? 'https://i.pinimg.com/564x/95/f6/86/95f68680ebc28b4ad669966c1f8da574.jpg' :
      rol === 'Administrador' ? 'https://i.pinimg.com/564x/b3/62/fd/b362fd9f6c965e3d154645a5260c0d3a.jpg' :
        rol === 'Optometrista' ? 'https://i.pinimg.com/564x/26/ab/94/26ab9450b90b2c994322467ec9945961.jpg' :
          rol === 'Venta' ? 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg' : 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg';
  }

  onItemClick(data: any) {
    this.dataItems = data;
  }
}