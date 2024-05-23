import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {
  data$: Observable<any>[] = []

  itemPhone = false
  itemMail = false

  tableColumnsCliente: TableColumn[] = [
    { label: 'ID', def: 'codigoProveedor', dataKey: 'codigoProveedor' },
    { label: 'Nombre empresa', def: 'nombre_Empresa', dataKey: 'nombre_Empresa' },
    { label: 'Contacto', def: 'contacto', dataKey: 'contacto' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
    { label: 'Correo', def: 'correos', dataKey: 'correos' },
    { label: 'Telefono', def: 'telefonos', dataKey: 'telefonos' }
  ];

  strignValues: any[] = ['Activo','Inactivo'];
  listAssociatedCompanyFilter: Observable<string[]> = of(['Activo', 'Inactivo']);



  formCreateClient: FormGroup = this.formBuilder.group(
    {
      'name_company': ['', Validators.required],
      'contact': ['', Validators.nullValidator],
      'address': ['', Validators.nullValidator],
      'phone1': ['', Validators.nullValidator],
      'phone2': ['', Validators.nullValidator],
      'mail1': ['', Validators.nullValidator],
      'mail2': ['', Validators.nullValidator],
    }
  )
  itemCreate: any = {
    name_company: '',
    contact: '',
    address: '',
    phone1: '',
    phone2: '',
    mail1: '',
    mail2: ''
  };
  itemClick: any;

  itemInfoUpdate = {
    name_company: '',
    contact: '',
    state: '',
    address: ''
  }

  formInfoUpdateClient: FormGroup = this.formBuilder.group(
    {
      'name_company': ['', Validators.nullValidator],
      'contact': ['', Validators.required],
      'state': ['', Validators.required],
      'address': ['', Validators.required]
    }
  )

  formGetUpdateClient(fr: string) {
    return this.formInfoUpdateClient.get(fr) as FormControl;
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

  formContactUpdateCliente: FormGroup = this.formBuilder.group(
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






  formGetCreateClient(fr: string) {
    return this.formCreateClient.get(fr) as FormControl;
  }


  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,
  ) { }

  ngOnInit() {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item
      if (item) {

        this.itemInfoUpdate = {
          name_company: item.nombre_Empresa,
          contact: item.contacto ,
          state: item.estado ? 'Activo':'Inactivo',
          address: item.direccion !== 'Dato no existente' ? item.direccion : '',
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

    this.mydataservices.getData("proveedor").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
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

  idItem: any;

  clickItem(vl: boolean, id: any) {
    this.idItem = id
    if (!this.itemPhone && vl) {
      this.itemPhone = true
      if (this.itemMail) {
        this.itemMail = false
      }
    } else {
      this.itemPhone = false
    }

    if (!this.itemMail && !vl) {
      this.itemMail = true
      if (this.itemPhone) {
        this.itemPhone = false
      }
    } else {
      this.itemMail = false
    }
  }

  resultItemPhone(id: any) {
    return this.idItem == id && this.itemPhone
  }

  resultItemMail(id: any) {
    return this.idItem == id && this.itemMail
  }



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
        this.formCreateClient.reset()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  saveDataCreate() {
    let data = {
      nombre_Empresa: this.itemCreate.name_company,
      contacto: this.itemCreate.contact !== ''?this.itemCreate.contact:null,
      direccion: this.itemCreate.address !== ''?this.itemCreate.address:null
    }

    this.mydataservices.postData('proveedor', data).then((success) => {
      if (success) {
        this.mydataservices.getData("proveedor").subscribe((respuesta: any[]) => {
          // console.log(respuesta)
          let todoslosdatos = respuesta
          this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
          this.data$ = this.data$.reverse()

          // console.log(respuesta)

          let result = todoslosdatos.find((obj: any) =>
            obj.nombre_Empresa == this.itemCreate.name_company
            // && obj.apellidos == this.itemCreate.apellidos
            // (this.itemCreate.cedula && obj.cedula == this.itemCreate.cedula)
          )

          console.log(result)

          if (this.itemCreate.phone1 && result) {
            let contact = {
              nombre_Empresa: result.nombre_Empresa,
              telefonoNuevo: this.itemCreate.phone1.toString()
            }

            console.log(contact)

            this.mydataservices.postData('telefonoproveedor ', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("proveedor").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })


              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el primer teléfono del proveedor.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })


          }

          if (this.itemCreate.phone2 && result) {
            let contact = {
              nombre_Empresa: result.nombre_Empresa,
              telefonoNuevo: this.itemCreate.phone2.toString()
            }

            this.mydataservices.postData('telefonoproveedor ', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("proveedor").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el segundo teléfono del proveedor.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })

          }

          if (this.itemCreate.mail1 && result) {
            let contact = {
              nombre_Empresa: result.nombre_Empresa,
              correoNuevo: this.itemCreate.mail1
            }

            this.mydataservices.postData('correocliente', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("proveedor").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el primer correo del cliente.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })
          }

          if (this.itemCreate.mail2 && result) {
            let contact = {
              nombre_Empresa: result.nombre_Empresa,
              correoNuevo: this.itemCreate.mail2
            }

            this.mydataservices.postData('correoproveedor ', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("proveedor").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el segundo correo del cliente.',
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
        this.mydataservices.getData("proveedor").subscribe((respuesta: any) => {
          console.log(respuesta)
          this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
          this.data$ = this.data$.reverse()
        }, (error) => {
          console.log(error)
        })
        this.formContactUpdateCliente.reset()
        this.formInfoUpdateClient.reset()
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
      nombre_Empresa: this.itemInfoUpdate.name_company,
      contacto: this.itemInfoUpdate.contact,
      direccion: this.itemInfoUpdate.address !== ''?this.itemInfoUpdate.address:null,
      estado: this.itemInfoUpdate.state == 'Activo' ?true:false,
    }

    this.mydataservices.updateData('proveedor', data, this.itemClick.codigoProveedor).then((success) => {
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
        nombre_Empresa: this.itemClick.nombre_Empresa,
        telefonoAnterior: this.itemContactUpdate.phone1,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }

      console.log(phone)

      this.mydataservices.updateData('telefonoproveedor', phone, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.phone1 !== '') {
      let phone = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }
      console.log(phone)
      this.mydataservices.postData('telefonoproveedor', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.phone2 !== '' && this.itemContactUpdate.phone2 !== '') {
      let phone = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        telefonoAnterior: this.itemContactUpdate.phone2,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }

      this.mydataservices.updateData('telefonoproveedor', phone, '').then((success) => {
        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.phone2 !== '') {
      let phone = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }
      this.mydataservices.postData('telefonoproveedor', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }

    //////

    if (this.itemContactUpdateNew.mail1 !== '' && this.itemContactUpdate.mail1 !== '') {
      let mail = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        correoAnterior: this.itemContactUpdate.mail1,
        correoNuevo: this.itemContactUpdateNew.mail1
      }

      this.mydataservices.updateData('correoproveedor ', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.mail1 !== '') {
      let mail = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        correoNuevo: this.itemContactUpdateNew.mail1
      }
      this.mydataservices.postData('correoproveedor ', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.mail2 !== '' && this.itemContactUpdate.mail2 !== '') {
      let mail = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        correoAnterior: this.itemContactUpdate.mail2,
        correoNuevo: this.itemContactUpdateNew.mail2
      }

      this.mydataservices.updateData('correoproveedor ', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.mail2 !== '') {
      let mail = {
        nombre_Empresa: this.itemClick.nombre_Empresa,
        correoNuevo: this.itemContactUpdateNew.mail2
      }
      this.mydataservices.postData('correoproveedor ', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }
  }




}
