import { Component, ElementRef } from '@angular/core';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  respuesta: any;
  itemUser: any;
 // itemClick: any;

  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
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
  strignValues: any[] = ['Activo','Inactivo'];
  listAssociatedCompanyFilter: Observable<string[]> = of(['Activo', 'Inactivo']);
  
  itemClick: any = null;
  ngOnInit() {
    this.mydataservices.getData("empleado").subscribe((respuesta: any) => {
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
    })

    this.dataGlobalservice.$itemView.subscribe(item => {
      
      this.itemClick = item
      
      if (item) {

        this.itemInfoUpdate = {
          codigo: item.numEmpleado,
          cedula: item.cedula !== 'Dato no existente' ? item.cedula : '',
          nombre: item.nombres,
          apellido: item.apellidos,
          state: item.estado ? 'Activo':'Inactivo',
          direccion: item.direccion !== 'Dato no existente' ? item.direccion : '',
          fechaNac: item.fechaNac !== 'Dato no existente' ? item.fechaNac : ''
        }

        if (item.telefonos !== "Dato no existente") {
          let subarray = item.telefonos.split(', ').map((fruta: string) => fruta.trim());
          this.itemContactUpdate.phone1 = subarray[0]
          this.itemContactUpdate.phone2 = subarray[1] ? subarray[1] : ''

        }

        if (item.correos !== "Dato no existente") {
          let subarray = item.correos.split(', ').map((fruta: string) => fruta.trim());
          this.itemContactUpdate.mail1 = subarray[0]
          this.itemContactUpdate.mail2 = subarray[1] ? subarray[1] : ''
        }
      }

    })
  }

  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    for (const key in datosProcesados) {
      if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === null) {
        datosProcesados[key] = "Dato no existente";
      } else if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === true) {
        datosProcesados[key] = "Activo";
      } else if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === false) {
        datosProcesados[key] = "Inactivo";
      }
    }
    return datosProcesados;
  }

//Para actualizar informacion
itemCreate: {
  codigo_Empleado?: any;
  cedula: any;
  nombres: string;
  apellidos: string;
  direccion?: any;
  fechaNac?: any;
  correos1?: any;
  correos2?: any;
  telefonos1?: any;
  telefonos2?: any;
} = {
    nombres: '',
    apellidos: '',
    cedula: null
  }

formCreateEmployee: FormGroup = this.formBuilder.group(
  {
    'identityCard': ['', Validators.nullValidator],
    'name': ['', Validators.required],
    'lastName': ['', Validators.required],
    'AssociatedCompany': ['Central Optic', Validators.required],
    'address': ['', Validators.nullValidator],
    'birthday': ['', Validators.nullValidator],
    'phone1': ['', Validators.nullValidator],
    'phone2': ['', Validators.nullValidator],
    'mail1': ['', Validators.nullValidator],
    'mail2': ['', Validators.nullValidator],
  }
)

formGetCreateEmployee(fr: string) {
  return this.formCreateEmployee.get(fr) as FormControl;
}


itemInfoUpdate = {
  codigo: '',
  cedula: '',
  state: '',
  nombre: '',
  apellido: '',
  direccion: '',
  fechaNac: ''
}

formInfoUpdateEmployee: FormGroup = this.formBuilder.group(
  {
    'identityCard': ['', Validators.nullValidator],
    'name': ['', Validators.required],
    'lastName': ['', Validators.required],
    'state': ['', Validators.required],
    'address': ['', Validators.nullValidator],
    'birthday': ['', Validators.nullValidator]
  }
)

formGetUpdateEmployee(fr: string) {
  return this.formInfoUpdateEmployee.get(fr) as FormControl;
}

itemContactUpdate = {
  phone1: '',
  phone2: '',
  mail1: '',
  mail2: ''
}

itemContactUpdateNew = {
  phone1: '',
  phone2: '',
  mail1: '',
  mail2: ''
}

formContactUpdateEmployee: FormGroup = this.formBuilder.group(
  {
    'phone1': ['', Validators.nullValidator],
    'phone2': ['', Validators.nullValidator],
    'mail1': ['', Validators.nullValidator],
    'mail2': ['', Validators.nullValidator],
    'phone1v': ['', Validators.nullValidator],
    'phone2v': ['', Validators.nullValidator],
    'mail1v': ['', Validators.nullValidator],
    'mail2v': ['', Validators.nullValidator],
  }
)

formGetContactUpdateEmployee(fr: string) {
  return this.formContactUpdateEmployee.get(fr) as FormControl;
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
  // procesarDatosNulos(data: any): any {
  //   const datosProcesados = { ...data };
  //   for (const key in datosProcesados) {
  //     if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === null) {
  //       datosProcesados[key] = "Dato no existente";
  //     }
  //   }
  //   return datosProcesados;
  // }
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
  
  // Para realizar post a la endpoint de employee

  // Formateamos todo antes de enviar
  saveDataCreate() {
    let data = {
      nombres: this.itemCreate.nombres,
      apellidos: this.itemCreate.apellidos,
      cedula: this.itemCreate.cedula,
      direccion: this.itemCreate.direccion,
      fechaNac: this.itemCreate.fechaNac
    }

    this.mydataservices.postData('empleado', data).then((success) => {
      if (success) {
        this.mydataservices.getData("empleado").subscribe((respuesta: any[]) => {
          // console.log(respuesta)
          let todoslosdatos = respuesta
          this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
          this.data$ = this.data$.reverse()

          // console.log(respuesta)

          let result = todoslosdatos.find((obj: any) =>
            obj.nombres == this.itemCreate.nombres
            && obj.apellidos == this.itemCreate.apellidos
            // (this.itemCreate.cedula && obj.cedula == this.itemCreate.cedula)
          )

          console.log(result)

          if (this.itemCreate.telefonos1 && result) {
            let contact = {
              numEmpleado: result.numEmpleado,
              telefonoNuevo: this.itemCreate.telefonos1.toString()
            }

            console.log(contact)

            this.mydataservices.postData('telefonoempleado', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("empleado").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })


              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el primer teléfono del empleado.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })


          }

          if (this.itemCreate.telefonos2 && result) {
            let contact = {
              numEmpleado: result.numEmpleado,
              telefonoNuevo: this.itemCreate.telefonos2.toString()
            }

            this.mydataservices.postData('telefonoempleado', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("empleado").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el segundo teléfono del empleado.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })

          }

          if (this.itemCreate.correos1 && result) {
            let contact = {
              numEmpleado: result.numEmpleado,
              correoNuevo: this.itemCreate.correos1
            }

            this.mydataservices.postData('correoempleado', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("empleado").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el primer correo del emplead.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })
          }

          if (this.itemCreate.correos2 && result) {
            let contact = {
              numEmpleado: result.numEmpleado,
              correoNuevo: this.itemCreate.correos2
            }

            this.mydataservices.postData('correoempleado', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("empleado").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el segundo correo del empleado.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })

          }

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: '¡La información ha sido guardada exitosamente!',
          })

        }, (error) => {
          console.log(error)
        })
      } else {

      }
    })

    console.log(data)
  }

// Preguntamos antes de enviar

  saveDataConfirmed() {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea guardar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDataCreate()
        // this.formUpdateData.reset()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  saveDataUpdateConfirmed() {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDataUpdate()
        this.mydataservices.getData("empleado").subscribe((respuesta: any) => {
          console.log(respuesta)
          this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
          this.data$ = this.data$.reverse()
        }, (error) => {
          console.log(error)
        })
        this.formContactUpdateEmployee.reset()
        this.formInfoUpdateEmployee.reset()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  saveDataUpdate() {
    let data = {
      nombres: this.itemInfoUpdate.nombre,
      apellidos: this.itemInfoUpdate.apellido,
      cedula: this.itemInfoUpdate.cedula !== '' ?this.itemInfoUpdate.cedula:null,
      estado: this.itemInfoUpdate.state == 'Activo' ?true:false,
      direccion: this.itemInfoUpdate.direccion !== ''?this.itemInfoUpdate.direccion:null,
      fechaNac: this.itemInfoUpdate.fechaNac !== '' ?this.itemInfoUpdate.fechaNac:null,
    }

    this.mydataservices.updateData('empleado', data, this.itemInfoUpdate.codigo).then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Los cambios se realizaron correctamente',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Algo salió mal!',
          footer: '<a href="">¿Por qué tengo este problema??</a>'
        })
      }
    })

    if (this.itemContactUpdateNew.phone1 !== '' && this.itemContactUpdate.phone1 !== '') {
      let phone = {
        numEmpleado: this.itemInfoUpdate.codigo,
        telefonoAnterior: this.itemContactUpdate.phone1,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }

      this.mydataservices.updateData('telefonoempleado', phone, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.phone1 !== '') {
      let phone = {
        numEmpleado: this.itemInfoUpdate.codigo,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }
      this.mydataservices.postData('telefonoEmpleado', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.phone2 !== '' && this.itemContactUpdate.phone2 !== '') {
      let phone = {
        numEmpleado: this.itemInfoUpdate.codigo,
        telefonoAnterior: this.itemContactUpdate.phone2,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }

      this.mydataservices.updateData('telefonoempleado', phone, '').then((success) => {
        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.phone2 !== '') {
      let phone = {
        numEmpleado: this.itemInfoUpdate.codigo,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }
      this.mydataservices.postData('telefonoempleado', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }

    //////

    if (this.itemContactUpdateNew.mail1 !== '' && this.itemContactUpdate.mail1 !== '') {
      let mail = {
        numEmpleado: this.itemInfoUpdate.codigo,
        correoAnterior: this.itemContactUpdate.mail1,
        correoNuevo: this.itemContactUpdateNew.mail1
      }

      this.mydataservices.updateData('correoempleado', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.mail1 !== '') {
      let mail = {
        numEmpleado: this.itemInfoUpdate.codigo,
        correoNuevo: this.itemContactUpdateNew.mail1
      }
      this.mydataservices.postData('correoEmpleado', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.mail2 !== '' && this.itemContactUpdate.mail2 !== '') {
      let mail = {
        numEmpleado: this.itemInfoUpdate.codigo,
        correoAnterior: this.itemContactUpdate.mail2,
        correoNuevo: this.itemContactUpdateNew.mail2
      }

      this.mydataservices.updateData('correoempleado', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.mail2 !== '') {
      let mail = {
        numEmpleado: this.itemInfoUpdate.codigo,
        correoNuevo: this.itemContactUpdateNew.mail2
      }
      this.mydataservices.postData('correoempleado', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }

  }

  // Funciones terciarias para la animacion de iconos

  // Animaciones del icono del telefono
  twoPhone: boolean = false;
  iconAddPhone: boolean = false;
  iconSubPhone: boolean = false;

  classIconPhone() {
    return this.twoPhone ?
      !this.iconSubPhone ? 'fa-solid fa-minus' : 'fa-solid fa-circle-minus'
      :
      !this.iconAddPhone ? 'fa-solid fa-plus' : 'fa-solid fa-circle-plus'
  }

  iconChangeEnterPhone() {
    this.iconAddPhone = true
    this.iconSubPhone = true
  }

  iconChangeOverPhone() {
    this.iconAddPhone = false
    this.iconSubPhone = false
  }

  clickPhone() {
    this.twoPhone = !this.twoPhone
  }

  // Animaciones del icono del correo

  twoMail: boolean = false;
  iconAddMail: boolean = false;
  iconSubMail: boolean = false;

  classIconMail() {
    return this.twoMail ?
      !this.iconAddMail ? 'fa-solid fa-minus' : 'fa-solid fa-circle-minus'
      :
      !this.iconSubMail ? 'fa-solid fa-plus' : 'fa-solid fa-circle-plus'
  }

  iconChangeEnterMail() {
    this.iconAddMail = true
    this.iconSubMail = true
  }

  iconChangeOverMail() {
    this.iconSubMail = false
    this.iconAddMail = false
  }

  clickMail() {
    this.twoMail = !this.twoMail
  }

}
