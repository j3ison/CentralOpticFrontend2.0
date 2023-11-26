import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  data$: Observable<any>[] = []

  typeInvoice:any[] = []
  typeClient:any[] = []
  typeTypeInvoce:any[] = []
  typeStatusInvoice:any[] = []



  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder) { }

  tableColumnsProveedor: TableColumn[] = [
    { label: 'ID', def: 'numFactura', dataKey: 'numFactura' },
    { label: 'Emisor', def: 'emisor', dataKey: 'emisor' },
    { label: 'Empresa Asociada', def: 'empresa_Asociada', dataKey: 'empresa_Asociada' },
    { label: 'Estado de Factura', def: 'estado_Factura', dataKey: 'estado_Factura' },
    { label: 'Fecha Emision', def: 'fecha_Emision', dataKey: 'fecha_Emision' },
    { label: 'Tipo de Venta', def: 'tipoVenta', dataKey: 'tipoVenta' },
    { label: 'Tipo de Factura', def: 'tipo_Factura', dataKey: 'tipo_Factura' },
    { label: 'Tipo de Venta', def: 'tipoVenta', dataKey: 'tipoVenta' },
    { label: 'Sub-total', def: 'subtotal', dataKey: 'subtotal' },
    { label: 'Total', def: 'total', dataKey: 'total' },
  ];

  ngOnInit(): void {
    this.mydataservices.getData("factura").subscribe((respuesta: any) => {
      console.log(respuesta.map((obj: any) => this.procesarDatosNulos(obj)));
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("tipofactura").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.typeInvoice = respuesta
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("estadofactura").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.typeInvoice = respuesta
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("cliente").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.typeInvoice = respuesta
    }, (error) => {
      console.log(error)
    })

  }



  procesarDatosNulos(data: any): any {
    const datosProcesados = { ...data };
    // Iterar sobre las propiedades del objeto y reemplazar los valores null
    for (const key in datosProcesados) {      
      if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === null) {
        datosProcesados[key] = "Dato no existente";
      }
    }
    return datosProcesados;
  }

  openDialog() {
    // const options: SwalOptions = {
    //   title: 'Seleccione una persona',
    //   type: 'info',
    //   showCancelButton: true,
    //   confirmButtonText: 'Aceptar',
    //   cancelButtonText: 'Cancelar',
    //   input: {
    //     type: 'text',
    //     label: 'Buscar...',
    //     value: '',
    //     onInput: (value: string) => {
    //       this.searchTerm = value;
    //     }
    //   },
    //   html: `
    //     <table class="swal-table table table-striped">
    //       <thead>
    //         <tr>
    //           <th>Nombre</th>
    //           <th>Edad</th>
    //           <th>Correo electrónico</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr *ngFor="let person of data | filter:this.filter">
    //           <td>{{person.name}}</td>
    //           <td>{{person.age}}</td>
    //           <td>{{person.email}}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   `,
    // };

    // Swal.fire(options).then((result) => {
    //   if (result.value) {
    //     // La fila seleccionada es la que se encuentra en el índice `result.value`
    //     const selectedRow = this.data[result.value];

    //     // Puedes hacer lo que quieras con la fila seleccionada
    //   }
    // });
  }





}

// @Pipe({
//   name: 'NullToEmptyPipe'
// })
// export class NullToEmptyPipe implements PipeTransform {

//   transform(value: any) {
//     return Object.keys(value).reduce((result:any[], key) => {
//       result[key] = value[key] !== null ? value[key] : 'Dato no proporcionado';
//       return result;
//     }, {});
//   }
// }

/*
addDe: 1.25
addIz: 1.25
altDe: 0
altIz: 0
cliente: "Jurgen Francisco Bermudez Picado"
cylDe: 0
cylIz: 0
descripcion_Credito: null
descuento: 0
dpDe: 62
dpIz: 62
ejeDe: 0
ejeIz: 0
emisor: "Roberto Antonio Orozco Gutiérrez"
empresa_Asociada: "Central Optic"
estado_Factura: "Pendiente"
fecha_Emision: "2023-11-21T20:54:29.617"
impuesto: 0.15
numFactura: 1
numero_Ruc: "0012607890035Y"
observacion: null
paciente: "Jurgen Francisco Bermudez Picado"
sphDe: 0
sphIz: 0
subtotal: 6475
tipoVenta: false
tipo_Factura: "Contado"
total: 7446.25
*/

/*
 public int NumFactura { get; set; }
 public DateTime Fecha_Emision { get; set; }
 public string Estado_Factura { get; set; }
 public string Tipo_Factura { get; set; }
 public bool TipoVenta { get; set; }
 public string Emisor { get; set; }
 public string Numero_Ruc { get; set; }
 public string Empresa_Asociada { get; set; }
 public string Cliente { get; set; }
 public decimal Impuesto { get; set; }
 public decimal Descuento { get; set; }
 public decimal? Subtotal { get; set; } null
 public decimal? Total { get; set; } null
 public string? Descripcion_Credito { get; set; } null


 public string? Paciente { get; set; } null
 public string? Observacion { get; set; } null
 public decimal? SPHIz { get; set; } null
 public decimal? CYLIz { get; set; } null
 public decimal? ADDIz { get; set; } null
 public int? EJEIz { get; set; } null
 public int? DPIz { get; set; } null
 public int? ALTIz { get; set; } null
 public decimal? SPHDe { get; set; } null
 public decimal? CYLDe { get; set; } null
 public decimal? ADDDe { get; set; } null
 public int? EJEDe { get; set; } null
 public int? DPDe { get; set; } null
 public int? ALTDe { get; set; } null
*/