import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  itemUser: any = {
    apellidos: '',
    clave: null,
    correo: '',
    estado: true,
    idUsuario: -1,
    nombreUsuario: '',
    nombres: '',
    numero_Empleado: -1,
    rol: '',
  }

  itemEmploye: any = {
    apellidos:'',
    cedula:'',
    correos:'',
    direccion:'',
    edad:0,
    estado:'',
    fechaNac:'',
    nombres:'',
    numEmpleado:0,
    telefonos:''
  }

  clave = ''

  valChange = false;

  

  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private auth: AuthService
  ) {


  }
  ngOnInit() {
    this.mydataservices.getData("usuario/" + this.authService.user.value?.id).subscribe((respuest: any) => {

      this.itemUser = respuest;
      console.log(this.itemUser);
      this.cdr.detectChanges();
      this.cdr.markForCheck()

    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("empleado/" + this.authService.user.value?.numEmpleado).subscribe((respuest: any) => {

      this.itemEmploye = respuest;
      console.log(this.itemEmploye);
      this.cdr.detectChanges();
      this.cdr.markForCheck()

    }, (error) => {
      console.log(error)
    })

  }

  guardar(){
    if(this.clave != ''){
      
      if(this.clave.length > 6){
        let data = 
        this.mydataservices.updateData('usuario',{
          nombreUsuario: this.itemUser[0].nombres,
          numeroEmpleado: this.itemEmploye[0].numEmpleado,
          clave: this.clave,
          rol: this.itemUser[0].rol,
          estado: true
        },this.itemUser[0].idUsuario).then((success) => {
          if (success){
            this.valChange = !this.valChange
            this.clave = ''
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'La clave fue modificada con exito',
            })
          }
        })
      }else{
        Swal.fire({
          title: 'Confirmar',
          text: 'La contraseña es devil ¿Desea modificarla?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Modificar',
          cancelButtonText: 'Salir',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.valChange = !this.valChange
            this.clave = ''
          }
        });
      }

      
    }else{
      this.valChange = !this.valChange
      this.clave = ''
    }
    
  }



  ngAfterViewInit() {




    // this.authService.user$.subscribe((repuesta: any) => {
    //   this.mydataservices.getData("usuario/" + repuesta.id).subscribe(respuest => {
    //     this.itemUser = respuest
    //     console.log(this.itemUser)
    //   })

    //   this.mydataservices.getData("empleado/" + repuesta.numEmpleado).subscribe(rest => {
    //     this.itemEmploye = rest
    //   })
    // })
  }
}
