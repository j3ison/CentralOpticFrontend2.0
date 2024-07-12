import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import {
  CustomForm,
  Employee,
  EyeExam,
  EyeExamModel,
  ILaboratory,
  Laboratory,
  Product,
} from '../model';
import Swal from 'sweetalert2';

interface OrdenModel {
  numero_Orden?: number;
  numero_Examen: number;
  numero_Empleado: number;
  fecha_Emision: string;
  laboratorio: string;
  descripcion_Producto: string;
  costo: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(
    private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService
  ) {}

  formCreate: CustomForm<OrdenModel> = this.formBuilder.group({
    numero_Examen: [undefined, Validators.required],
    numero_Empleado: [undefined, Validators.required],
    costo: [undefined, Validators.required],
    descripcion_Producto: [undefined, Validators.required],
    fecha_Emision: [undefined, Validators.required],
    laboratorio: [undefined, Validators.required],
  });

  listStatus = of([
    { value: 0, title: 'Pendiente' },
    { value: 1, title: 'Obtenido' },
    { value: 2, title: 'Entregado' },
    { value: 3, title: 'Anulado' },
  ]);

  formUpdate: CustomForm = this.formBuilder.group({
    Estado_OrdenLente: ['', Validators.required],
  });

  itemCreate: OrdenModel = {

    costo: 0,
    descripcion_Producto: '',
    fecha_Emision: '',
    laboratorio: '',
    numero_Empleado: 0,
    numero_Examen: 0,
  };

  data$: Observable<any>[] = [];
  employeeList: Employee[] = [];
  examenList: EyeExamModel[] = [];
  productList: Product[] = [];
  laboratorioList: ILaboratory[] = [];
  tableColumns: TableColumn[] = [
    { label: 'Número de Orden', def: 'numeroOrden', dataKey: 'numero_Orden' },
    {
      label: 'Fecha de Emisión',
      def: 'fechaEmision',
      dataKey: 'fecha_Emision',
    },
    {
      label: 'Empleado Emisor',
      def: 'empleadoEmisor',
      dataKey: 'empleado_Emisor',
    },
    {
      label: 'Número de Examen',
      def: 'numeroExamen',
      dataKey: 'numero_Examen',
    },
    { label: 'Fecha de Examen', def: 'fechaExamen', dataKey: 'fecha_Examen' },
    { label: 'Paciente', def: 'paciente', dataKey: 'paciente' },
    { label: 'Observación', def: 'observacion', dataKey: 'observacion' },
    { label: 'Laboratorio', def: 'laboratorio', dataKey: 'laboratorio' },
    {
      label: 'Código de Producto',
      def: 'codigoProducto',
      dataKey: 'codigo_Producto',
    },
    {
      label: 'Descripción del Producto',
      def: 'descripcionProducto',
      dataKey: 'descripcion_Producto',
    },
    {
      label: 'Estado de la Orden de Lente',
      def: 'estadoOrdenLente',
      dataKey: 'estado_OrdenLente',
    },
    { label: 'Costo', def: 'costo', dataKey: 'costo' },
  ];

  itemClick: any = null;
  ngOnInit() {
    this.mydataservices.getData('laboratorio').subscribe(
      (respuesta) => {
        this.laboratorioList = respuesta.filter((x) => x.estado);
      },
      (error) => {
        console.log(error);
      }
    );

    this.mydataservices.getData('producto').subscribe(
      (respuesta) => {
        this.productList = respuesta.filter((x) => x.estado);
      },
      (error) => {
        console.log(error);
      }
    );

    this.mydataservices.getData('empleado').subscribe(
      (data) => {
        this.employeeList = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.mydataservices.getData('examen').subscribe(
      (data) => {
        console.log(data);
        this.examenList = data.filter((x) => x.estado);
      },
      (error) => {
        console.log(error);
      }
    );

    this.obtenerTabla();
  }
  viewFormNull() {
    Swal.fire({
      title: "Opción no habilitada",
      html: `
       <img src="https://cdn-icons-png.flaticon.com/512/11046/11046410.png" alt="Error" style="width: 100px; height: 100px;">
      `,
      showCloseButton: true,

      focusConfirm: false,
      confirmButtonText: `
      <i class="fa-solid fa-person-digging"></i> OK!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      imageWidth: 120,
    });
  }
  obtenerTabla() {
    this.mydataservices.getData('ordenlente').subscribe(
      (respuesta: any) => {
        this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
        this.data$ = this.data$.reverse();
        console.log(this.data$);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    for (const key in datosProcesados) {
      if (
        datosProcesados.hasOwnProperty(key) &&
        datosProcesados[key] === null
      ) {
        datosProcesados[key] = 'Dato no existente';
      } else if (
        datosProcesados.hasOwnProperty(key) &&
        datosProcesados[key] === true
      ) {
        datosProcesados[key] = 'Activo';
      } else if (
        datosProcesados.hasOwnProperty(key) &&
        datosProcesados[key] === false
      ) {
        datosProcesados[key] = 'Inactivo';
      }
    }
    return datosProcesados;
  }

  formGet = (fr: string) => this.formCreate.get(fr) as FormControl;

  formUpdateGet = (fr: string) => this.formUpdate.get(fr) as FormControl;

  async saveDataConfirmeUpdate({ numero_Orden }: OrdenModel) {
    console.log(this.formUpdate.value);

    const result = await Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar el estado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed && numero_Orden) {
      this.mydataservices
        .updateData('ordenlente', this.formUpdate.value, numero_Orden)
        .then((success) => {
          if (success) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Los cambios se realizaron correctamente',
            });
            this.obtenerTabla();
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

      this.formUpdate.reset();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'Los datos no han sido modificados', 'error');
    }
  }

  onItemClickActive(data: any) {
    if (this.itemClick !== data) {
      this.itemClick = data;
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null;
      this.dataGlobalservice.setItemView(null);
    }
  }

  async onSaveOrder() {
    if (!this.formCreate.valid) return;

    const result = await Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea guardar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      this.mydataservices
        .postData('ordenlente', this.formCreate.value)
        .then((success) => {
          if (success) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Los cambios se realizaron correctamente',
            });
            this.obtenerTabla();
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

      this.formCreate.reset();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'Los datos no han sido modificados', 'error');
    }
  }
}
