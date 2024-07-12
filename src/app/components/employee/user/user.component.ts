import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { Product } from '../../model';
import Swal from 'sweetalert2';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  private matDialogRef!: MatDialogRef<DialogComponent>;

  tableColumnsProveedor: TableColumn[] = [
    { label: 'ID Usuario', def: 'idUsuario', dataKey: 'idUsuario' },
    { label: 'Nombre', def: 'nombres', dataKey: 'nombres' },
    { label: 'Apellidos', def: 'apellidos', dataKey: 'apellidos' },
    { label: 'Correo', def: 'correo', dataKey: 'correo' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Rol', def: 'rol', dataKey: 'rol' },
    { label: 'Nombre de Usuario', def: 'nombreUsuario', dataKey: 'nombreUsuario' },
    { label: 'Clave', def: 'clave', dataKey: 'clave' },
  ]

  data$: Observable<any>[] = []
  dataItems: any = null;

  dataEmployee: Observable<any>[] = []

  tableColumnsEmployee: TableColumn[] = [
    { label: 'Número de Empleado', def: 'numEmpleado', dataKey: 'numEmpleado' },
    { label: 'Cédula', def: 'cedula', dataKey: 'cedula' },
    { label: 'Nombres', def: 'nombres', dataKey: 'nombres' },
    { label: 'Apellidos', def: 'apellidos', dataKey: 'apellidos' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Fecha de nacimiento', def: 'fechaNac', dataKey: 'fechaNac' },
  ];

  formCreateClient: FormGroup = this.formBuilder.group(
    {
      'clave': ['', Validators.required],
      'nombres': ['', Validators.nullValidator],
      'apellidos': ['', Validators.nullValidator],
      'estado': ['Activo', Validators.required],
      'nombreUsuario': ['', Validators.required],
      'numero_Empleado': [0, Validators.required],
      'rol': ['', Validators.required],
      'mail1': ['', Validators.nullValidator],
      'mail2': ['', Validators.nullValidator],
    }
  )

  formUpdateClient: FormGroup = this.formBuilder.group(
    {
      'clave': ['', Validators.required],
      'nombres': ['', Validators.nullValidator],
      'apellidos': ['', Validators.nullValidator],
      'estado': ['Activo', Validators.required],
      'nombreUsuario': ['', Validators.required],
      'numero_Empleado': [0, Validators.required],
      'rol': ['', Validators.required],
      'mail1': ['', Validators.nullValidator],
      'mail2': ['', Validators.nullValidator],
    }
  )

  listRoll: Observable<any[]> | undefined
  filteredOptions: Observable<any[]> | undefined;

  @Output() eventClickItems = new EventEmitter<void>();
  itemClick: any = null;

  constructor(private mydataservices: MyDataServices,
    private dataGlobalservice: DataGlobalService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService) { }

  onItemClickActive(data: any) {
    if (this.itemClick !== data) {
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
  }

  listAssociatedCompany: any[] = []
  listAssociatedCompanyFilter: Observable<any[]> = of(['Activo', 'Inactivo']);



  formGetCreateClient(fr: string) {
    return this.formCreateClient.get(fr) as FormControl;
  }

  itemCreate: {
    idUsuario: any;
    clave?: any;
    nombres: string;
    apellidos: string;
    estado: string;
    nombreUsuario: any;
    numero_Empleado: any;
    rol: any;
    correos1?: any;
    correos2?: any;
  } = {
      idUsuario: 1,
      nombres: '',
      apellidos: '',
      estado: 'Activo',
      clave: null,
      nombreUsuario: '',
      rol: '',
      numero_Empleado: 0
    }

  itemEmployee: any = {
    numEmpleado: 0
  };

  private _filterAssociatedCompany(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listAssociatedCompany.filter(option => option.rol.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {

    this.dataGlobalservice.$itemView.subscribe(item => {

      this.itemClick = {...item}

      console.log(this.itemClick)
      if (item) {

        this.formUpdateClient.patchValue ({
          clave: '',
          nombreUsuario: item.nombreEmpresa,
          rol: item.rol,
          estado: item.estado,
        })

      
      }

    })

    this.mydataservices.getData("empleado/true").subscribe((respuesta: any) => {
      this.dataEmployee = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.dataEmployee = this.dataEmployee.reverse()
      console.log(this.dataEmployee)
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("rol").subscribe((respuesta: any) => {

      this.listAssociatedCompany = respuesta
      console.log(respuesta)

    }, (error) => {

      console.log(error)
    })


    this.mydataservices.getData("usuario").subscribe((respuesta: any) => {

      respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      console.log(respuesta)

    }, (error) => {

      console.log(error)
    })

    this.listAssociatedCompanyFilter = (this.formCreateClient.get('rol') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterAssociatedCompany(value || '')),
    );




  }



  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    // Iterar sobre las propiedades del objeto y reemplazar los valores null
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


  resultDataTableProduct($event: any) {
    console.log($event)
    const data = { ...$event }
    this.itemEmployee = data
    this.cancelDialogResult();
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

  saveDataCreate() {
    let data = {
      clave: this.itemCreate.clave,
      estado: true,
      nombreUsuario: this.itemCreate.nombreUsuario,
      numeroEmpleado: this.itemEmployee.numEmpleado,
      rol: this.itemCreate.rol
    }

    console.log(data)

    this.mydataservices.postData('usuario', data).then((success) => {
      if (success) {

        this.formCreateClient.reset

        this.itemCreate = {
          idUsuario: 1,
          nombres: '',
          apellidos: '',
          estado: 'Activo',
          clave: '',
          nombreUsuario: '',
          rol: '',
          numero_Empleado: 0
        }

        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: '¡La información ha sido guardada exitosamente!',
        })

      } else {

      }
    })

    console.log(data)
  }

  saveDataConfirmedUpdate() {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea Actualizar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDataUpdate()
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

  saveDataUpdate() {
    let data = {
      clave: this.itemClick.clave == 'Dato no existente'?null:this.itemClick.clave,
      estado: this.itemClick.estado == 'Activo',
      numeroEmpleado:this.itemClick.numero_Empleado,
      nombreUsuario: this.itemClick.nombreUsuario,
      rol: this.itemClick.rol
    }

    console.log(data)

    this.mydataservices.updateData('usuario', data,this.itemClick.idUsuario).then((success) => {
      if (success) {

        this.formUpdateClient.reset

        this.itemCreate = {
          idUsuario: 1,
          nombres: '',
          apellidos: '',
          estado: 'Activo',
          clave: '',
          nombreUsuario: '',
          rol: '',
          numero_Empleado: 0
        }

        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: '¡La información ha sido guardada exitosamente!',
        })

      } else {

      }
    })

    console.log(data)
  }


  image(rol: string): string {
    return rol === 'Super Administrador' ? 'https://i.pinimg.com/564x/95/f6/86/95f68680ebc28b4ad669966c1f8da574.jpg' :
      rol === 'Administrador' ? 'https://i.pinimg.com/564x/b3/62/fd/b362fd9f6c965e3d154645a5260c0d3a.jpg' :
        rol == 'Optometrista' ? 'https://i.pinimg.com/564x/26/ab/94/26ab9450b90b2c994322467ec9945961.jpg' :
          rol === 'Venta' ? 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg' : 'https://i.pinimg.com/564x/bf/a2/0e/bfa20e3b1e7448bf778e5a01600226b1.jpg'
  }

  onItemClick(data: any) {
    this.dataItems = data
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    if (template) {
      // console.log(this.formCreateView)
      this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

      this.matDialogRef.afterClosed().subscribe((res) => {
      });
    } else {
      // this.viewFormNull();
    }
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

}
