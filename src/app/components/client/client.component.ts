import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  respuesta: any;
  itemUser: any;
  onItemClickActive(data: any) {
    if (this.itemClick !== data) {
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
  }

  itemCreate: {
    codigo_Cliente?: any;
    cedula: any;
    nombres: string;
    apellidos: string;
    empresa_Asociada: string;
    direccion?: any;
    fechaNac?: any;
    correos1?: any;
    correos2?: any;
    telefonos1?: any;
    telefonos2?: any;
  } = {
      nombres: '',
      apellidos: '',
      empresa_Asociada: '',
      cedula: null
    }


  // Data test = {
  //   apellidos: "Bermudez Picado",
  //   cedula: "001-190203-1008B",
  //   codigo_Cliente: 1,
  //   correos: "fbermudez@outlook.com, jurgen@gmail.com",
  //   direccion: null,
  //   edad: 21,
  //   empresa_Asociada: "Central Optic",
  //   fechaNac: "2003-02-19T00:00:00",
  //   nombres: "Jurgen Francisco",
  //   telefonos: "92856013"
  // }

  data$: Observable<any>[] = []

  tableColumnsCliente: TableColumn[] = [
    { label: 'ID', def: 'codigo_Cliente', dataKey: 'codigo_Cliente' },
    { label: 'Cedula', def: 'cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'nombres', dataKey: 'nombres' },
    { label: 'Apellido', def: 'apellidos', dataKey: 'apellidos' },
    { label: 'Edad', def: 'edad', dataKey: 'edad' },
    { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
    { label: 'Fecha de nacimiento', def: 'fechaNac', dataKey: 'fechaNac' },
    { label: 'Telefono', def: 'telefonos', dataKey: 'telefonos' },
    { label: 'Correo', def: 'correos', dataKey: 'correos' },
    { label: 'Empresa Asociada', def: 'empresa_Asociada', dataKey: 'empresa_Asociada' },
  ];

  itemClick: any = null;

  listAssociatedCompany: any[] = []
  listAssociatedCompanyFilter!: Observable<any[]>;

  formCreateClient: FormGroup = this.formBuilder.group(
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

  formGetCreateClient(fr: string) {
    return this.formCreateClient.get(fr) as FormControl;
  }


  // formUpdateClient: FormGroup = this.formBuilder.group(
  //   {
  //     'identityCard': [this.itemClick.cedula, Validators.nullValidator],
  //     'name': [this.itemClick.nombres, Validators.required],
  //     'lastName': [this.itemClick.apellidos, Validators.required],
  //     'AssociatedCompany': [this.itemClick.empresa_Asociada, Validators.required],
  //     'address': [this.itemClick.direccion, Validators.nullValidator],
  //     'birthday': [this.itemClick.fechaNac, Validators.nullValidator]
  //   }
  // )

  itemInfoUpdate = {
    codigo: '',
    cedula: '',
    nombre: '',
    apellido: '',
    empresa: '',
    direccion: '',
    fechaNac: ''
  }

  formInfoUpdateClient: FormGroup = this.formBuilder.group(
    {
      'identityCard': ['', Validators.nullValidator],
      'name': ['', Validators.required],
      'lastName': ['', Validators.required],
      'AssociatedCompany': ['', Validators.required],
      'address': ['', Validators.nullValidator],
      'birthday': ['', Validators.nullValidator]
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

  formGetContactUpdateClient(fr: string) {
    return this.formContactUpdateCliente.get(fr) as FormControl;
  }






  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,


  ) { }


  private _filterAssociatedCompany(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listAssociatedCompany.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  ngOnInit() {

    this.dataGlobalservice.$itemView.subscribe(item => {

      this.itemClick = item
      
      if (item) {

        this.itemInfoUpdate = {
          codigo: item.codigo_Cliente,
          cedula: item.cedula !== 'Dato no existente' ? item.cedula : '',
          nombre: item.nombres,
          apellido: item.apellidos,
          empresa: item.empresa_Asociada,
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


    this.mydataservices.getData("cliente").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("empresa").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.listAssociatedCompany = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
    }, (error) => {
      console.log(error)
    })

    this.listAssociatedCompanyFilter = (this.formCreateClient.get('AssociatedCompany') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterAssociatedCompany(value || '')),
    );
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


  saveDataCreate() {
    let data = {
      empresa_Asociada: this.itemCreate.empresa_Asociada,
      nombres: this.itemCreate.nombres,
      apellidos: this.itemCreate.apellidos,
      cedula: this.itemCreate.cedula,
      direccion: this.itemCreate.direccion,
      fechaNac: this.itemCreate.fechaNac
    }

    this.mydataservices.postData('cliente', data).then((success) => {
      if (success) {
        this.mydataservices.getData("cliente").subscribe((respuesta: any[]) => {
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
              codigo_Cliente: result.codigo_Cliente,
              telefonoNuevo: this.itemCreate.telefonos1.toString()
            }

            console.log(contact)

            this.mydataservices.postData('telefonocliente', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("cliente").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })


              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el primer teléfono del cliente.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })


          }

          if (this.itemCreate.telefonos2 && result) {
            let contact = {
              codigo_Cliente: result.codigo_Cliente,
              telefonoNuevo: this.itemCreate.telefonos2.toString()
            }

            this.mydataservices.postData('telefonocliente', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("cliente").subscribe((respuesta: any[]) => {
                  // console.log(respuesta)
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.data$ = this.data$.reverse()
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ups...',
                  text: 'Se ha producido un error al intentar guardar el segundo teléfono del cliente.',
                  footer: '<a href="">¿Por qué tengo este problema??</a>'
                })
              }
            })

          }

          if (this.itemCreate.correos1 && result) {
            let contact = {
              codigo_Cliente: result.codigo_Cliente,
              correoNuevo: this.itemCreate.correos1
            }

            this.mydataservices.postData('correocliente', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("cliente").subscribe((respuesta: any[]) => {
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

          if (this.itemCreate.correos2 && result) {
            let contact = {
              codigo_Cliente: result.codigo_Cliente,
              correoNuevo: this.itemCreate.correos2
            }

            this.mydataservices.postData('correocliente', contact).then((success) => {
              if (success) {

                this.mydataservices.getData("cliente").subscribe((respuesta: any[]) => {
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
        this.mydataservices.getData("cliente").subscribe((respuesta: any) => {
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
      cedula: this.itemInfoUpdate.cedula !== '' ?this.itemInfoUpdate.cedula:null,
      nombres: this.itemInfoUpdate.nombre,
      apellidos: this.itemInfoUpdate.apellido,
      empresa_Asociada: this.itemInfoUpdate.empresa,
      direccion: this.itemInfoUpdate.direccion !== ''?this.itemInfoUpdate.direccion:null,
      fechaNac: this.itemInfoUpdate.fechaNac !== '' ?this.itemInfoUpdate.fechaNac:null,
    }

    this.mydataservices.updateData('cliente', data, this.itemInfoUpdate.codigo).then((success) => {
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
      console.log(this.itemContactUpdateNew.phone1)
      console.log(this.itemContactUpdate.phone1)
      let phone = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        telefonoAnterior: this.itemContactUpdate.phone1,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }

      this.mydataservices.updateData('telefonocliente', phone, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.phone1 !== '') {
      let phone = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        telefonoNuevo: this.itemContactUpdateNew.phone1
      }
      this.mydataservices.postData('telefonocliente', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.phone2 !== '' && this.itemContactUpdate.phone2 !== '') {
      let phone = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        telefonoAnterior: this.itemContactUpdate.phone2,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }

      this.mydataservices.updateData('telefonocliente', phone, '').then((success) => {

        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.phone2 !== '') {
      let phone = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        telefonoNuevo: this.itemContactUpdateNew.phone2
      }
      this.mydataservices.postData('telefonocliente', phone).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }

    //////

    if (this.itemContactUpdateNew.mail1 !== '' && this.itemContactUpdate.mail1 !== '') {
      let mail = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        correoAnterior: this.itemContactUpdate.mail1,
        correoNuevo: this.itemContactUpdateNew.mail1
      }

      this.mydataservices.updateData('correocliente ', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 1')
        }
      })
    } else if (this.itemContactUpdateNew.mail1 !== '') {
      let mail = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        correoNuevo: this.itemContactUpdateNew.mail1
      }
      this.mydataservices.postData('correocliente ', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 1')
        }
      })
    }

    if (this.itemContactUpdateNew.mail2 !== '' && this.itemContactUpdate.mail2 !== '') {
      let mail = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        correoAnterior: this.itemContactUpdate.mail2,
        correoNuevo: this.itemContactUpdateNew.mail2
      }

      this.mydataservices.updateData('correocliente ', mail, '').then((success) => {
        if (success) {
          console.log('funciono telefono 2')
        }
      })
    } else if (this.itemContactUpdateNew.mail2 !== '') {
      let mail = {
        codigo_Cliente: this.itemInfoUpdate.codigo,
        correoNuevo: this.itemContactUpdateNew.mail2
      }
      this.mydataservices.postData('correocliente ', mail).then((success) => {
        if (success) {
          console.log('funciono new telefono 2')
        }
      })
    }





  }





}
