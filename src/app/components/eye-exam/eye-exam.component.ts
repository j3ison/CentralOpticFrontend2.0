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
    { label: 'Número de Examen', def: 'numExamen', dataKey: 'numExamen' },
    { label: 'Estado', def: 'estado', dataKey: 'estado'},
    { label: 'Empleado', def: 'empleado', dataKey: 'empleado' },
    { label: 'Paciente', def: 'paciente', dataKey: 'paciente' },
    { label: 'Fecha de Realización', def: 'fecha_Realizacion', dataKey: 'fecha_Realizacion' },
    { label: 'Observación', def: 'observacion', dataKey: 'observacion' },
    { label: 'Esfera Izquierda', def: 'sphIz', dataKey: 'sphIz' },
    { label: 'Cilindro Izquierda', def: 'cylIz', dataKey: 'cylIz' },
    { label: 'Adición Izquierda', def: 'addIz', dataKey: 'addIz' },
    { label: 'Eje Izquierda', def: 'ejeIz', dataKey: 'ejeIz' },
    { label: 'DP Izquierda', def: 'dpIz', dataKey: 'dpIz' },
    { label: 'Altura Izquierda', def: 'altIz', dataKey: 'altIz' },
    { label: 'Esfera Derecha', def: 'sphDe', dataKey: 'sphDe' },
    { label: 'Cilindro Derecha', def: 'cylDe', dataKey: 'cylDe' },
    { label: 'Adición Derecha', def: 'addDe', dataKey: 'addDe' },
    { label: 'Eje Derecha', def: 'ejeDe', dataKey: 'ejeDe' },
    { label: 'DP Derecha', def: 'dpDe', dataKey: 'dpDe' },
    { label: 'Altura Derecha', def: 'altDe', dataKey: 'altDe' }
  ];

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
    return datosProcesados;
  }


}
