import { Component, ElementRef } from '@angular/core';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import { Client, Employee } from '../model';
import { MatSelectModule } from '@angular/material/select';
import { LoginUser } from 'src/app/auth/model/user.interface';
import { CookieService } from 'ngx-cookie-service';

interface EyeExamModel {
  numExamen: number;
  estado: boolean;
  numEmpleado: number;
  codigo_Cliente: string;
  fecha_Realizacion: string;
  observacion: string;
  sphIz?: number;
  cylIz?: number;
  addIz?: number;
  ejeIz?: number;
  dpIz?: number;
  altIz?: number;
  sphDe?: number;
  cylDe?: number;
  addDe?: number;
  ejeDe?: number;
  dpDe?: number;
  altDe?: number;
}

@Component({
  selector: 'app-eye-exam',
  templateUrl: './eye-exam.component.html',
  styleUrls: ['./eye-exam.component.css'],
})
export class EyeExamComponent {
  userFromLocal = this.cookieService.get('userData');
  user: LoginUser = JSON.parse(this.userFromLocal) as LoginUser
  respuesta: any;
  itemUser: any;
  onItemClickActive(data: any) {
    if (this.itemClick !== data) {
      this.itemClick = data;
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null;
      this.dataGlobalservice.setItemView(null);
    }
  }

  displayedColumns: string[] = ['data', 'title1', 'title2'];
  listStatus = of([
    { value: true, title: 'Activo' },
    { value: false, title: 'Inactivo' },
  ]);

  employeeList: Employee[] = [];
  customerList: Client[] = [];
  parameters = [
    { data: 'sph', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
    { data: 'cyl', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
    { data: 'add', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
    { data: 'eje', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
    { data: 'dp', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
    { data: 'alt', title1: 'Ojo Izquierdo', title2: 'Ojo Derecho' },
  ];

  constructor(
    private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private cookieService: CookieService

  ) {}

  itemClick: any = null;

  formCreateEyeExam: FormGroup & {
    controls: { [key in keyof EyeExamModel]: AbstractControl };
  } = this.formBuilder.group({
    addDe: [undefined, Validators.nullValidator],
    addIz: [undefined, Validators.nullValidator],
    altDe: [undefined, Validators.nullValidator],
    altIz: [undefined, Validators.nullValidator],
    cylDe: [undefined, Validators.nullValidator],
    cylIz: [undefined, Validators.nullValidator],
    dpDe: [undefined, Validators.nullValidator],
    dpIz: [undefined, Validators.nullValidator],
    ejeDe: [undefined, Validators.nullValidator],
    ejeIz: [undefined, Validators.nullValidator],
    sphDe: [undefined, Validators.nullValidator],
    sphIz: [undefined, Validators.nullValidator],

    numEmpleado: ['', Validators.required],
    estado: ['', Validators.required],
    fecha_Realizacion: ['', Validators.required],
    numExamen: [0, Validators.nullValidator],
    observacion: ['', Validators.nullValidator],
    codigo_Cliente: ['', Validators.required],
  });

  formGet(fr: string) {
    return this.formCreateEyeExam.get(fr) as FormControl;
  }

  // Definimos la estructura de la tabla

  ngOnInit() {
    this.mydataservices
      .getData('cliente')
      .subscribe((data) => (this.customerList = data));

    this.mydataservices.getData('empleado').subscribe((data) => {
      this.employeeList = data;
    },(error) => {
      console.log(error);
      this.mydataservices.getData('empleado/'+this.user.numEmpleado).subscribe((data) => {
        this.employeeList = data;
      })
    });

    this.dataGlobalservice.$itemView.subscribe((item) => {});
    this.getEyeExamList();
  }

  getEyeExamList() {
    this.mydataservices.getData('examen').subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
        this.data$ = this.data$.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onNext(stepper: any) {
    console.log(this.formCreateEyeExam);
    if (this.formCreateEyeExam.valid) {
      stepper.next();
    }
  }

  async saveEyeExam() {
    console.log(this.formCreateEyeExam.value);
    if (!this.formCreateEyeExam.valid) return;

    const result = await Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      this.mydataservices
        .postData('examen', { ...this.formCreateEyeExam.value, numExamen: 0 })
        .then((success) => {
          if (success) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Los cambios se realizaron correctamente',
            });
            this.getEyeExamList();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Algo salió mal!',
              footer: '<a href="">¿Por qué tengo este problema??</a>',
            });
          }
        });

      // this.saveDataUpdate();
      
      this.formCreateEyeExam.reset();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'Los datos no han sido modificados', 'error');
    }
  }

  //#region Metodos Tabla
  data$: Observable<any>[] = [];

  tableColumnsExamen: TableColumn[] = [
    { label: 'ID', def: 'numExamen', dataKey: 'numExamen' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Empleado', def: 'empleado', dataKey: 'empleado' },
    { label: 'Paciente', def: 'paciente', dataKey: 'paciente' },
    { label: 'Sph OD OI', def: 'sphIz', dataKey: 'sph' },
    { label: 'Cyl OD OI', def: 'cylIz', dataKey: 'cyl' },
    { label: 'Add OD OI', def: 'addIz', dataKey: 'add' },
    { label: 'Eje OD OI', def: 'ejeIz', dataKey: 'eje' },
    { label: 'DP OD OI', def: 'dpIz', dataKey: 'dp' },
    { label: 'Alt OD OI', def: 'altIz', dataKey: 'alt' },
    {
      label: 'Fecha de Realización',
      def: 'fecha_Realizacion',
      dataKey: 'fecha_Realizacion',
    },
    { label: 'Observación', def: 'observacion', dataKey: 'observacion' },
  ];

  itemCreate: EyeExamModel = {
    numEmpleado: 0,
    estado: true,
    fecha_Realizacion: '',
    numExamen: 0,
    observacion: '',
    codigo_Cliente: '',
  };
  itemUpdate: any = {
    paciente: '',
    fecha_Realizacion: '',
    observacion: '',
    sph: '',
  };

  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    for (const key in datosProcesados) {
      if (
        datosProcesados.hasOwnProperty(key) &&
        datosProcesados[key] === null
      ) {
        datosProcesados[key] = 'Dato no existente';
      }
    }

    this.combinarClaves(datosProcesados, 'sphDe', 'sphIz', 'sph');
    this.combinarClaves(datosProcesados, 'cylDe', 'cylIz', 'cyl');
    this.combinarClaves(datosProcesados, 'addDe', 'addIz', 'add');
    this.combinarClaves(datosProcesados, 'ejeDe', 'ejeIz', 'eje');
    this.combinarClaves(datosProcesados, 'dpDe', 'dpIz', 'dp');
    this.combinarClaves(datosProcesados, 'altDe', 'altIz', 'alt');

    return datosProcesados;
  }

  combinarClaves(
    datosProcesados: any,
    key1: string,
    key2: string,
    combinedKey: string
  ): void {
    if (
      datosProcesados.hasOwnProperty(key1) &&
      datosProcesados.hasOwnProperty(key2)
    ) {
      const valor1 =
        datosProcesados[key1] === 'Dato no existente'
          ? 'NA'
          : datosProcesados[key1];
      const valor2 =
        datosProcesados[key2] === 'Dato no existente'
          ? 'NA'
          : datosProcesados[key2];
      datosProcesados[combinedKey] = `${valor1} ${valor2}`;
    }
  }
  //#endregion
}
