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

  // Definimos la estructura de la tabla

  data$: Observable<any>[] = []


  tableColumnsCliente: TableColumn[] = [
    { label: 'Codigo Lab', def: 'codigo_Laboratorio', dataKey: 'codigo_Laboratorio' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
    { label: 'Telefono', def: 'telefono', dataKey: 'telefono' },
    { label: 'Correo', def: 'correo', dataKey: 'correo' },
  ];

  // Definimos la estructura tambien si al item en la tabla se le quiere actualizar

  // En la estructura no se pide ni correo ni telefono, porque se pide luego

  itemInfoUpdate = {
    codigo: '',
    nombre: '',
    direccion: '',
  }

  formInfoUpdateLab: FormGroup = this.formBuilder.group(
    {
      'name': ['', Validators.required],
      'address': ['', Validators.nullValidator],
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

  ngOnInit() {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item
      if (item) {
        this.itemInfoUpdate = {
          codigo: item.codigo_Laboratorio,
          nombre: item.nombre,
          direccion: item.direccion !== 'Dato no existente' ? item.direccion : '',
        }

        if (item.telefono !== "Dato no existente") {
          this.itemContactUpdate.phone1 = item.telefono
        }

        if (item.correo !== "Dato no existente") {
          this.itemContactUpdate.mail1 = item.correo
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


}
