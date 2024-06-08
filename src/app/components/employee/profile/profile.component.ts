import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';

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
