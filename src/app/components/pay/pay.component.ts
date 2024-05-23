import { Component, ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';



// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: './pay.component.html',
//   standalone: true,
//   imports: [],
// })
// export class DialogOverviewExample {
//   animal: string | undefined;
//   name: string | undefined;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogOverviewExample, {
//       data: {name: this.name, animal: this.animal},
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }
// }






@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  
  data$: Observable<any>[] = []

  tableColumnsCliente: TableColumn[] = [
    { label: 'ID Pago', def: 'id_Pago', dataKey: 'id_Pago' },
    { label: 'Tipo de Pago', def: 'tipo_Pago', dataKey: 'tipo_Pago' },
    { label: 'Estado de la Factura', def: 'estado_Factura', dataKey: 'estado_Factura' },
    { label: 'Fecha del pago', def: 'fecha_Pago', dataKey: 'fecha_Pago' },
    { label: 'Numero de Factura', def: 'numero_Factura', dataKey: 'numero_Factura' },
    { label: 'Tipo de Factura', def: 'tipo_Factura', dataKey: 'tipo_Factura' },
    { label: 'Cliente Facturado', def: 'cliente_Factura', dataKey: 'cliente_Factura' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Abonado', def: 'abono', dataKey: 'abono' },
  ];


  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,
  ) { }
  
  ngOnInit(){
    this.mydataservices.getData("pago").subscribe((respuesta: any) => {
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
        datosProcesados[key] = "Valido";
      } else if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === false) {
        datosProcesados[key] = "Invalido";
      }
    }
    return datosProcesados;
  }





}
