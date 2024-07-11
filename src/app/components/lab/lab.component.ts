import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent {

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

  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,

  ) { }

  itemClick: any = null;
  itemPhone = false
  itemMail = false

  // Definimos la estructura de la tabla

  data$: Observable<any>[] = []


  tableColumnsCliente: TableColumn[] = [
    { label: 'Codigo Lab', def: 'codigo_Laboratorio', dataKey: 'codigo_Laboratorio' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Telefono', def: 'telefono', dataKey: 'telefono' },
    { label: 'Correo', def: 'correo', dataKey: 'correo' },
  ];

  // Lista para definir activo o inactivo en el caso del estado del laboratorio
  strignValues: any[] = ['Activo','Inactivo'];
  listAssociatedCompanyFilter: Observable<string[]> = of(['Activo', 'Inactivo']);

  // Definimos la estructura tambien si al item en la tabla se le quiere actualizar
  itemInfoUpdate = {
    codigo: '',
    name: '',
    address: '',
    state:'',
    phone1v: '',
    mail1v: ''
  }

  formInfoUpdateLab: FormGroup = this.formBuilder.group(
    {
      'name': ['', Validators.required],
      'address': ['', Validators.nullValidator],
      'state': ['', Validators.required],
    }
  )

  formGetUpdateLab(fr: string) {
    return this.formInfoUpdateLab.get(fr) as FormControl;
  }

  // Estructura para actualizar la info de contacto

  itemContactUpdate = {
    phone1: '',
    mail1: ''
  }

  itemContactUpdateNew = {
    phone1: '',
    mail1: ''
  }

  formContactUpdateLab: FormGroup = this.formBuilder.group(
    {
      'phone1': ['', Validators.nullValidator],
      'mail1': ['', Validators.nullValidator],
      'phone1v': ['', Validators.nullValidator],
      'mail1v': ['', Validators.nullValidator],
    }
  )

  formGetContactUpdateLab(fr: string) {
    return this.formContactUpdateLab.get(fr) as FormControl;
  }

  // Definimos la estructura para agregar un nuevo lab
  itemCreate: any = {
    codigo_Laboratorio:'',
    name: '',
    address: '',
    phone1: '',
    mail1: '',
  };
  formCreateLab: FormGroup = this.formBuilder.group(
    {
      'name': ['', Validators.required],
      'address': ['', Validators.nullValidator],
      'phone1': ['', Validators.nullValidator],
      'mail1': ['', Validators.nullValidator],
    }
  )
  formGetCreateLab(fr: string) {
    return this.formCreateLab.get(fr) as FormControl;
  }


  // Establecemos que cada que se haga intancia al componente traiga los datos
  ngOnInit() {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item
      if (item) {
        this.itemInfoUpdate = {
          codigo: item.codigo_Laboratorio,
          name: item.nombre,
          state: item.estado ? 'Activo':'Inactivo',
          address: item.direccion !== 'Dato no existente' ? item.direccion : '',
          phone1v: item.phone1,
          mail1v:item.mail1

        }

        if (item.telefono !== "Dato no existente") {
          this.itemContactUpdate.phone1 = item.telefono
        }

        if (item.correo !== "Dato no existente") {
          this.itemContactUpdate.mail1= item.correo
        }
      }

    })

    this.mydataservices.getData("laboratorio").subscribe((respuesta: any) => {
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
//-----------------------------------------------------------------//
saveDataCreate() {
  let data = {
    nombre: this.itemCreate.name,
    direccion: this.itemCreate.address,
    telefono: this.itemCreate.phone1.toString(),
    correo: this.itemCreate.mail1,
  }

  this.mydataservices.postData('laboratorio', data).then((success) =>{
    console.log(data)
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

}

// Ahora el actualizar
saveDataUpdate() {
  let data = {
    codigo_Laboratorio: this.itemInfoUpdate.codigo,
    estado: this.itemInfoUpdate.state == 'Activo' ?true:false,
    nombre: this.itemInfoUpdate.name,
    direccion: this.itemInfoUpdate.address !== ''?this.itemInfoUpdate.address:null,
    telefono:this.itemInfoUpdate.phone1v !== ''?this.itemInfoUpdate.phone1v:null,
    correo: this.itemInfoUpdate.mail1v !== ''?this.itemInfoUpdate.mail1v:null
  }

  this.mydataservices.updateData('laboratorio', data, this.itemClick.codigo_Laboratorio).then((success) => {
    console.log(data)
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
      this.mydataservices.getData("laboratorio").subscribe((respuesta: any) => {
        console.log(respuesta)
        this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
        this.data$ = this.data$.reverse()
      }, (error) => {
        console.log(error)
      })
      this.formContactUpdateLab.reset()
      this.formInfoUpdateLab.reset()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        'Los datos siguen a salvo:)',
        'error'
      )
    }
  });
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
      this.formCreateLab.reset()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        'Los datos siguen a salvo:)',
        'error'
      )
    }
  });
}

//-----------------------------------------------------------------//
  //Funciones auxiliares para la IU 
  twoPhone: boolean = false;
  iconAddPhone: boolean = false;
  iconSubPhone: boolean = false;


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
