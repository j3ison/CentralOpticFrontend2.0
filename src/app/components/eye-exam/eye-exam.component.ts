import { Component, ElementRef } from '@angular/core';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';

@Component({
  selector: 'app-eye-exam',
  templateUrl: './eye-exam.component.html',
  styleUrls: ['./eye-exam.component.css']
})
export class EyeExamComponent {
  
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

  tableColumnsExamen: TableColumn[] = [
    { label: 'ID', def: 'numExamen', dataKey: 'numExamen' },
    { label: 'Estado', def: 'estado', dataKey: 'estado'},
    { label: 'Empleado', def: 'empleado', dataKey: 'empleado' },
    { label: 'Paciente', def: 'paciente', dataKey: 'paciente' },
    { label: 'Sph OD OI', def: 'sphIz', dataKey: 'sph' },
    { label: 'Cyl OD OI', def: 'cylIz', dataKey: 'cyl' },
    { label: 'Add OD OI', def: 'addIz', dataKey: 'add' },
    { label: 'Eje OD OI', def: 'ejeIz', dataKey: 'eje' },
    { label: 'DP OD OI', def: 'dpIz', dataKey: 'dp' },
    { label: 'Alt OD OI', def: 'altIz', dataKey: 'alt' },
    { label: 'Fecha de Realización', def: 'fecha_Realizacion', dataKey: 'fecha_Realizacion' },
    { label: 'Observación', def: 'observacion', dataKey: 'observacion' },
  ];

  itemCreate: any = {
    paciente: '',
    fecha_Realizacion: '',
    observacion: '',
    sphIz: '',
  };
  itemUpdate: any ={
    paciente: '',
    fecha_Realizacion: '',
    observacion: '',
    sph: '',
  }

  ngOnInit() {
    this.mydataservices.getData("examen").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()

    }, (error) => {
      console.log(error)
    })
    this.dataGlobalservice.$itemView.subscribe(item => {


    })
  }


  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    for (const key in datosProcesados) {
      if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === null) {
        datosProcesados[key] = "Dato no existente";
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
  combinarClaves(datosProcesados: any, key1: string, key2: string, combinedKey: string): void {
    if (datosProcesados.hasOwnProperty(key1) && datosProcesados.hasOwnProperty(key2)) {
      const valor1 = datosProcesados[key1] === "Dato no existente" ? "NA" : datosProcesados[key1];
      const valor2 = datosProcesados[key2] === "Dato no existente" ? "NA" : datosProcesados[key2];
      datosProcesados[combinedKey] = `${valor1} ${valor2}`;
  }
  }


}
