import { Component, ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

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
    { label: 'Fecha del pago', def: 'fecha_Pago', dataKey: 'fecha_Pago' },
    { label: 'Numero de Factura', def: 'numero_Factura', dataKey: 'numero_Factura' },
    { label: 'Estado de la Factura', def: 'estado_Factura', dataKey: 'estado_Factura' },
    { label: 'Tipo de Factura', def: 'tipo_Factura', dataKey: 'tipo_Factura' },
    { label: 'Cliente Facturado', def: 'cliente_Factura', dataKey: 'cliente_Factura' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Abonado', def: 'abono', dataKey: 'abono' },
  ];

  formCreateClient: FormGroup = this.formBuilder.group(
    {
      'invoice': ['', Validators.required],
      'typePay': ['', Validators.required],
      'pass': ['', Validators.required],
      'payDay': ['', Validators.required],
      'description': ['', Validators.nullValidator]
    }
  )




  formGetDataCreate(fr: string) {
    return this.formCreateClient.get(fr) as FormControl;
  }

  listTypePayCreate: Observable<any[]> = of(['Tarjeta', 'Efectivo', 'Transferencia']);

  today = new Date();

  itemCreatePay: any = {
    numero_Factura: -1,
    tipo_Pago: "Efectivo",
    abono: 0,
    fecha_Pago: this.today.toISOString(),
    descripcion: ''
  }

  private matDialogRef!: MatDialogRef<DialogComponent>;

  listStatusInvoiceFilterUpdate: Observable<string[]> = of(['Valido', 'Invalido']);
  itemStatusInvoice = ''

  itemClick: any = null
  itemInvoice: any = null

  formDataUpdate: FormGroup = this.formBuilder.group(
    {
      'estadoFactura': ['', Validators.required],
    }
  )



  listInvoiceFilter: any;
  tableColumnsInvoice: TableColumn[] = [
    { label: 'ID', def: 'numFactura', dataKey: 'numFactura' },
    { label: 'Emisor', def: 'emisor', dataKey: 'emisor' },
    { label: 'Cliente', def: 'cliente', dataKey: 'cliente' },
    { label: 'Estado de Factura', def: 'estado_Factura', dataKey: 'estado_Factura' },
    { label: 'Fecha Emision', def: 'fecha_Emision', dataKey: 'fecha_Emision' },
    { label: 'Tipo de Factura', def: 'tipo_Factura', dataKey: 'tipo_Factura' },
    { label: 'Sub-total', def: 'subtotal', dataKey: 'subtotal' },
    { label: 'Total', def: 'total', dataKey: 'total' },
  ];
  itemInvoiceV: any = {};

  formGetDataUpdate(fr: string) {
    return this.formDataUpdate.get(fr) as FormControl;
  }


  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,
  ) { }



  ngOnInit() {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item

      if (item) {

        this.mydataservices.getData("factura/" + this.itemClick.numero_Factura).subscribe((respuesta: any) => {
          this.itemInvoice = respuesta
          console.log(this.itemInvoice)
        }, (error) => {
          console.log(error)
        })

      }
    })


    this.mydataservices.getData("pago").subscribe((respuesta: any) => {
      console.log(respuesta)
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("factura/" + true).subscribe((respuesta: any) => {
      this.listInvoiceFilter = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.listInvoiceFilter = this.listInvoiceFilter.filter((obj: any) => obj.estado_Factura !== 'Cancelado')
    }, (error) => {
      console.log(error)
    })

    // this.mydataservices.getData("tipopago").subscribe((respuesta: any) => {
    //   console.log(respuesta)
    //   // this.listTypePayCreateArray = respuesta
    // }, (error) => {
    //   console.log(error)
    // })



  }

  imgItems(estadoFactura: string) {
    return estadoFactura !== "Valido" ? 'https://cdn-icons-png.flaticon.com/512/929/929457.png' :
      'https://cdn-icons-png.flaticon.com/512/4302/4302066.png';
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

  saveDataConfirmeUpdate(data: any) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar el estado del Pago?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const estado = {
          "estado": this.itemStatusInvoice === 'Valido' ? true : false
        }

        this.mydataservices.updateData('pago', estado, data.id_Pago).then((success) => {

          if (success) {
            this.mydataservices.getData("pago").subscribe((respuesta: any) => {
              this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
            }, (error) => {
              console.log(error)
            })

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

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo :)',
          'error'
        )
      }
    });
  }

  onItemClickActive(data: any) {

    if (this.itemClick !== data) {
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
  }


  openDialogWithTemplate(template: TemplateRef<any>) {
    if (template) {
      // console.log(this.formCreateView)
      this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

      this.matDialogRef.afterClosed().subscribe((res) => {
      });
    } else {
      this.viewFormNull();
    }
  }

  cancelDialogResult() {
    this.matDialogRef.close()
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

  resultDataTableProduct($event: any) {
    console.log($event)
    const data = { ...$event }
    data.cantidad = 1
    this.itemInvoiceV = data
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
        this.formCreateClient.reset()
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
    let fecha1 = new Date();
      fecha1.setHours(0, 0, 0, 0)
    let data = {
      numero_Factura: this.itemInvoiceV.numFactura,
      tipo_Pago: this.itemCreatePay.tipo_Pago,
      abono: this.itemCreatePay.abono,
      fecha_Pago: fecha1.toISOString(),
      descripcion: this.itemCreatePay.descripcion?this.itemCreatePay.descripcion:null
    }

    this.mydataservices.postData("pago", data).then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'La factura se realizo correctamente',
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Algo salió mal!',
          footer: '<a href="">¿Por qué tengo este problema??</a>'
        })
        return
      }
    })

  }

}