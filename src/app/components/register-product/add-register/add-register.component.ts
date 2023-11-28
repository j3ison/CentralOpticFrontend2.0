import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.css']
})
export class AddRegisterComponent {
  data$: Observable<any>[] = [];
  dataItems: any = null;

  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;
  today: any;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices) {}
  
 
  ngOnInit() {
    this.today = new Date();
    this.form = this.fb.group({
      codigoProducto: [''],
      descripcion: [''],
      fechaAdquisicion: this.today.toISOString(),
      costo: [0],
      cantidad: [0],
      estado: [true]
    });

  }
  onSubmit() {
    if (this.form.valid) {
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
  
      this.mydataservices.postData('registroProducto', data).then((success) => {
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
