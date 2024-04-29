import { Component, ElementRef, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
import { Client, DetailInvoice, Exam, InvoiceGet, InvoicePost, Product, StatusInvoice, TypeInvoice } from '../model';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { ViewDataComponent } from 'src/app/modules/view-data/view-data.component';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  data$: Observable<InvoiceGet>[] = []
  listInvoice: InvoiceGet[] = []
  listTypeInvoice: TypeInvoice[] = []
  listTypeInvoiceFilter!: Observable<TypeInvoice[]>;
  listClient: Client[] = []
  listExam: Exam[] = []
  listProducto: Product[] = []
  listProductoFilter: Product[] = []
  listStatusInvoice: StatusInvoice[] = []
  listStatusInvoiceFilter!: Observable<StatusInvoice[]>;
  listStatusInvoiceFilterUpdate!: Observable<StatusInvoice[]>;

  searchTerm: string = "";
  private matDialogRef!: MatDialogRef<DialogComponent>;
  private viewData!: ViewDataComponent;

  boolProduct: boolean = true

  itemClient: Client = {
    codigo_Cliente: 0,
    empresa_Asociada: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    direccion: '',
    fechaNac: '',
    edad: '',
    correos: '',
    telefonos: ''
  };

  itemExam: Exam[] = []

  itemListProduct: Product[] = []

  today = new Date();

  itemInvoice: InvoicePost = {
    estado_Factura: '',
    numeroEmpleado: 0,
    codigo_Cliente: 0,
    tipoVenta: false,
    impuesto: 0,
    descuento: 0,
    fecha_Emision: this.today.toISOString(),
    numExamen: 0
  };

  typeShop: string[] = ['Piso', 'Convenio']
  typeShopFilter!: Observable<string[]>;
  itemTypeShop: string = 'Piso'

  user: any;

  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService
  ) { }

  tableColumnsFactura: TableColumn[] = [
    { label: 'ID', def: 'numFactura', dataKey: 'numFactura' },
    { label: 'Emisor', def: 'emisor', dataKey: 'emisor' },
    { label: 'Empresa Asociada', def: 'empresa_Asociada', dataKey: 'empresa_Asociada' },
    { label: 'Estado de Factura', def: 'estado_Factura', dataKey: 'estado_Factura' },
    { label: 'Fecha Emision', def: 'fecha_Emision', dataKey: 'fecha_Emision' },
    { label: 'Cliente', def: 'cliente', dataKey: 'cliente' },
    { label: 'Tipo de Venta', def: 'tipoVenta', dataKey: 'tipoVenta' },
    { label: 'Tipo de Factura', def: 'tipo_Factura', dataKey: 'tipo_Factura' },
    // { label: 'Tipo de Venta', def: 'tipoVenta', dataKey: 'tipoVenta' },
    { label: 'Sub-total', def: 'subtotal', dataKey: 'subtotal' },
    { label: 'Total', def: 'total', dataKey: 'total' },
  ];

  tableColumnsCliente: TableColumn[] = [
    { label: 'Cedula', def: 'cedula', dataKey: 'cedula' },
    { label: 'Nombres', def: 'nombres', dataKey: 'nombres' },
    { label: 'Apellidos', def: 'apellidos', dataKey: 'apellidos' }
  ];

  tableColumnsExam: TableColumn[] = [
    { label: 'NumExamen', def: 'numExamen', dataKey: 'numExamen' },
    { label: 'Empleado', def: 'empleado', dataKey: 'empleado' },
    { label: 'Paciente', def: 'paciente', dataKey: 'paciente' }
  ];

  tableColumnsProduct: TableColumn[] = [
    { label: 'Codigo', def: 'codProducto', dataKey: 'codProducto' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
    { label: 'Precio de Venta', def: 'precioVenta', dataKey: 'precioVenta' }
  ];




  displayedColumnsEyesRig: string[] = ['sphDe', 'cylDe', 'ejeDe', 'addDe', 'dpDe', 'altDe'];
  displayedColumnsEyesLef: string[] = ['sphIz', 'cylIz', 'ejeIz', 'addIz', 'dpIz', 'altIz'];
  dispayedColumnsProducts: string[] = ['codProducto', 'descripcion', 'cantidad', 'precioVenta', 'accion'];
  displayedColumnsProductsInfo: string[] = ['codProducto', 'descripcion', 'cantidad', 'precioVenta'];


  formCreateItems: FormGroup = this.formBuilder.group(
    {
      'fechaEmision': [this.itemInvoice.fecha_Emision, Validators.required],
      'estadoFactura': ['', Validators.required],
      'tipoFactura': ['', Validators.nullValidator],
      'tipoVenta': ['Piso', Validators.nullValidator],
      'cliente': [this.itemClient.nombres, Validators.required],
      'examen': [this.itemExam.length > 0 ? this.itemExam[0].numExamen : '', Validators.nullValidator],
      'impuesto': [this.itemInvoice.impuesto, Validators.required],
      'descuento': [this.itemInvoice.descuento, Validators.required],
      'descripcion': [this.itemInvoice.descripcion_Credito, Validators.nullValidator],
      // 'Cantidad': [this.itemInvoice.tipo_Factura, Validators.required]
    }
  )

  formUpdateItems: FormGroup = this.formBuilder.group(
    {
      'fechaEmision': [, Validators.required],
      'estadoFactura': [, Validators.required],
      'cliente': [, Validators.required],
      // 'Cantidad': [this.itemInvoice.tipo_Factura, Validators.required]
    }
  )

  formDataCount: FormGroup = this.formBuilder.group(
    {
      'cantidad': ['', Validators.required],
    }
  )

  formGetDataCreateItems(fr: string) {
    return this.formCreateItems.get(fr) as FormControl;
  }

  private _filterStatusInvoice(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listStatusInvoice.filter(option => option.estadoFactura.toLowerCase().includes(filterValue)
      && option.estadoFactura != 'Anulado'
      && option.estadoFactura != 'Cancelado');
  }

  private _filterStatusInvoiceUpdate(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listStatusInvoice.filter(option => option.estadoFactura.toLowerCase().includes(filterValue));
  }

  private _filterTypeInvoice(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listTypeInvoice.filter(option => option.tipo_Factura.toLowerCase().includes(filterValue));
  }

  private _filterTypeShop(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.typeShop.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {

    this.mydataservices.getData("factura").subscribe((respuesta: any) => {
      console.log(respuesta.map((obj: any) => this.procesarDatosNulos(obj)));
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.listInvoice = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      this.data$ = this.data$.reverse()
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("tipofactura").subscribe((respuesta: any) => {
      // console.log(respuesta)
      this.listTypeInvoice = respuesta
    }, (error) => {
      console.log(error)
    })

    // this.mydataservices.getData("detallefactura").subscribe((respuesta: any) => {
    //   console.log(respuesta)
    //   // this.listTypeInvoice = respuesta
    // }, (error) => {
    //   console.log(error)
    // })

    this.mydataservices.getData("estadofactura").subscribe((respuesta: any) => {
      // console.log(respuesta)
      this.listStatusInvoice = respuesta
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("cliente").subscribe((respuesta: any) => {
      // console.log(respuesta)
      this.listClient = respuesta
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("producto").subscribe((respuesta: any) => {
      // console.log(respuesta)
      this.listProducto = respuesta
      this.listProductoFilter = this.listProducto.filter(obj => obj.cantidad > 0 && obj.estado == true)
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("examen").subscribe((respuesta: any) => {
      // console.log(respuesta)
      this.listExam = respuesta
    }, (error) => {
      console.log(error)
    })

    this.listStatusInvoiceFilter = (this.formCreateItems.get('estadoFactura') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatusInvoice(value || '')),
    );
    this.listStatusInvoiceFilterUpdate = (this.formCreateItems.get('estadoFactura') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatusInvoiceUpdate(value || '')),
    );

    this.listTypeInvoiceFilter = (this.formCreateItems.get('tipoFactura') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterTypeInvoice(value || '')),
    );

    this.typeShopFilter = (this.formCreateItems.get('tipoVenta') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => this._filterTypeShop(value || '')),
    );

    this.authService.user$.subscribe(resp => {
      this.user = resp
    })

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemClick = item
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

    const tableColumnsCliente: TableColumn[] = [
      { label: 'nombres', def: 'nombres', dataKey: 'nombres' },
      { label: 'apellidos', def: 'apellidos', dataKey: 'apellidos' },
      { label: 'telefonos', def: 'telefonos', dataKey: 'telefonos' }
    ]

    const tableDisplayColumns = tableColumnsCliente.map(col => col.def)

    const dataSource = new MatTableDataSource<any>

    dataSource.data = this.listClient;


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

  resultDataTableExam($event: any) {
    this.itemExam = [$event]
    this.itemInvoice.numExamen = $event.numExamen
    console.log($event)
    this.cancelDialogResult();
  }

  resultDataTableClient($event: any) {
    this.itemClient = $event
    console.log($event)
    this.cancelDialogResult();
  }

  resultDataTableProduct($event: any) {
    console.log($event)
    const data = { ...$event }
    data.cantidad = 1
    this.itemListProduct = [...this.itemListProduct, data]
    this.cancelDialogResult();
  }

  valDataProduct() {
    return this.listProducto.filter(obj => obj.cantidad > 0 && obj.estado == true)
  }


  getTotalCost() {
    return this.itemListProduct.map(t => t.precioVenta).reduce((acc, value) => acc + value, 0);
  }

  onChanceExam() {
    if (this.itemExam.length > 0 && this.itemInvoice.numExamen?.toString().trim() !== '' && this.itemInvoice.numExamen !== this.itemExam[0].numExamen) {
      this.itemExam = this.listExam.filter(obj => obj.numExamen == this.itemInvoice.numExamen);
    } else if (this.itemInvoice.numExamen?.toString().trim() !== '') {
      this.itemExam = this.listExam.filter(obj => obj.numExamen == this.itemInvoice.numExamen);
    }
  }

  imgItems(estadoFactura: string) {
    return estadoFactura === "Pendiente" ? 'https://cdn-icons-png.flaticon.com/512/2784/2784459.png' :
      estadoFactura === "Acreditado" ? 'https://cdn-icons-png.flaticon.com/512/583/583985.png' :
        estadoFactura === "Anulado" ? 'https://cdn-icons-png.flaticon.com/512/929/929457.png' :
          'https://cdn-icons-png.flaticon.com/512/4302/4302066.png';
  }

  saveData(data$: any) {
    if (data$?.cantidad && data$.cantidad.toString().trim() !== '') {
      const data = this.listProducto.find(obj => obj.codProducto == data$.codProducto)
      if (data)
        if (data.cantidad > data$.cantidad) {
          if (data$.cantidad !== 0) {
            data$.estado = true
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La cantidad no puede ser 0."
            });
          }
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La cantidad supera el stock actual."
          });
        }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La cantidad no puede estar vacio."
      });
    }
  }

  deleteItemProduct(data$: any) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemListProduct = this.itemListProduct.filter(obj => obj.codProducto != data$.codProducto)
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

    const estado = this.listStatusInvoice.find(obj => obj.estadoFactura == this.itemInvoice.estado_Factura);
    const tipoFactura = this.listTypeInvoice.find(obj => obj.tipo_Factura == this.itemInvoice.tipo_Factura);
    const cliente = this.listClient.filter(obj => obj.codigo_Cliente == this.itemClient.codigo_Cliente);

    const tipoVenta = this.typeShop.find(obj => obj.toLowerCase() == this.itemTypeShop.toLowerCase())

    // let FT = 0
    // forkJoin(this.data$).pipe(
    //   map((invoices: InvoiceGet[]) => {
    //     const numeros = invoices.map(objeto => objeto.numFactura ? objeto.numFactura : 0);
    //     FT = Math.max(...numeros) + 1;
    //   })
    // ).subscribe();

    // console.log(tipoVenta)
    if (!estado) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo 'Estado de Factura' tiene un dato no valido"
      });
    } else if (!tipoFactura) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo 'Tipo de Factura' tiene un dato no valido"
      });
    } else if (cliente.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo 'Cliente' tiene un dato no valido"
      });
    } else if (!tipoVenta) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo 'Tipo de Venta' tiene un dato no valido"
      });
    } else if (this.itemListProduct.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se a registrado ningun producto."
      });
    } else {
      let fecha1 = new Date();
      fecha1.setHours(0, 0, 0, 0)
      const data: InvoicePost = {
        numFactura: 0,
        estado_Factura: this.itemInvoice.estado_Factura,
        tipo_Factura: this.itemInvoice.tipo_Factura,
        numeroEmpleado: this.user?.id,
        codigo_Cliente: this.itemClient.codigo_Cliente,
        tipoVenta: this.itemTypeShop.toLowerCase() == 'convenio ' ? true : false,
        impuesto: this.itemInvoice.impuesto / 100,
        descuento: this.itemInvoice.descuento / 100,
        fecha_Emision: fecha1.toISOString(),
      }

      if (this.itemInvoice.descripcion_Credito?.trim() != '') {
        data.descripcion_Credito = this.itemInvoice.descripcion_Credito
      }
      if (this.itemExam.length > 0) {
        const exam = this.listExam.find(obj => obj.numExamen = this.itemExam[0].numExamen)
        if (exam) {
          data.numExamen = exam.numExamen
        }
      }

      this.mydataservices.postData('factura', data).then((success) => {
        if (success) {

          const numeros = this.listInvoice.map(objeto => objeto.numFactura ? objeto.numFactura : 0);
          let FT = Math.max(...numeros) + 1

          this.itemListProduct.forEach(element => {
            const detail: DetailInvoice = {
              numFactura: FT,
              codigo_Producto: element.codProducto,
              descripcion: element.descripcion,
              precio_Unitario: element.precioVenta,
              cantidad: element.cantidad,
              monto: element.precioVenta
            }

            this.mydataservices.postData('detallefactura/' + FT, detail).then(success => {
              if (success) {
                this.mydataservices.getData("factura").subscribe((respuesta: any) => {
                  console.log(respuesta.map((obj: any) => this.procesarDatosNulos(obj)));
                  this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                  this.listInvoice = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
                }, (error) => {
                  console.log(error)
                })
              }
            })
            // this.viewData.refresh();


          })

          if (success) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'La factura se realizo correctamente',
            })
          }

        } else {
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

  dataItems: any = null
  onItemClick(data: any) {
    this.dataItems = data
  }


  updateClick(data: any) {
    // console.log((data.estado_Factura == 'Cancelado' || data.estado_Factura == 'Anulado')?true:false)
    return (data.estado_Factura == 'Cancelado' || data.estado_Factura == 'Anulado') ? true : false
  }

  saveDataConfirmeUpdate(data: any) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar el estado de la factura?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const estado = {
          "estado_Factura": data.estado_Factura
        }

        this.mydataservices.updateData('factura', estado, data.numFactura).then((success) => {
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

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo :)',
          'error'
        )
      }
    });
  }



  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = true;

  // formCreateItems: FormGroup = this.formBuilder.group(
  //   {
  //     'fechaEmision': [this.itemInvoice.fecha_Emision, Validators.required],
  //     'estadoFactura': ['', Validators.required],
  //     'tipoFactura': ['', Validators.nullValidator],
  //     'tipoVenta': ['Piso', Validators.nullValidator],
  //     'cliente': [this.itemClient.nombres, Validators.required],
  //     'examen': [this.itemExam.length > 0 ? this.itemExam[0].numExamen : '', Validators.nullValidator],
  //     'impuesto': [this.itemInvoice.impuesto, Validators.required],
  //     'descuento': [this.itemInvoice.descuento, Validators.required],
  //     'descripcion': [this.itemInvoice.descripcion_Credito, Validators.nullValidator],
  //     // 'Cantidad': [this.itemInvoice.tipo_Factura, Validators.required]
  //   }
  // )

  formInfoInvoice: FormGroup = this.formBuilder.group(
    {
      'fechaEmision': [this.itemInvoice.fecha_Emision, Validators.required],
      'estadoFactura': ['Acreditado', Validators.required],
      'tipoFactura': ['Contado', Validators.nullValidator],
      'tipoVenta': ['Piso', Validators.nullValidator],
    }
  )

  formGetInfoInvoice(fr: string) {
    return this.formInfoInvoice.get(fr) as FormControl;
  }

  formDataClient: FormGroup = this.formBuilder.group(
    {
      'cliente': [this.itemClient.nombres, Validators.required],
      'examen': [this.itemExam.length > 0 ? this.itemExam[0].numExamen : '', Validators.nullValidator],
    }
  )

  formGetDataClient(fr: string) {
    return this.formDataClient.get(fr) as FormControl;
  }

  formDataProduct: FormGroup = this.formBuilder.group(
    {
      'impuesto': [this.itemInvoice.impuesto, Validators.required],
      'descuento': [this.itemInvoice.descuento, Validators.required],
      'descripcion': [this.itemInvoice.descripcion_Credito, Validators.nullValidator],
    }
  )

  formGetDataProduct(fr: string) {
    return this.formDataProduct.get(fr) as FormControl;
  }

  itemClick: any = null
  onItemClickActive(data: any) {
    
    if (this.itemClick !== data){
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    }else{
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
  }



}