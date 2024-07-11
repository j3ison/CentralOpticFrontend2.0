import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

 
  data$: Observable<any>[] = []
  dataItems: any = null;
  item: any = null

  tableColumnsInventory: TableColumn[] = [
    { label: 'Codigo', def: 'codProducto', dataKey: 'codProducto' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Tipo', def: 'tipoProducto', dataKey: 'tipoProducto' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Venta', def: 'precioVenta', dataKey: 'precioVenta' },
    { label: 'Compra', def: 'precioCompra', dataKey: 'precioCompra' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
    { label: 'Stock Minimo', def: 'stockMinimo', dataKey: 'stockMinimo' },
    { label: 'Stock Maximo', def: 'stockMaximo', dataKey: 'stockMaximo' }
  ]


  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices, private formBuilder: FormBuilder, private dataGlobalservice: DataGlobalService) { }

  formCreate: FormGroup = this.formBuilder.group(
    {
      'codProducto': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tipoProducto': ['', Validators.required],
      'precioVenta': ['', Validators.required],
      'precioCompra': ['', Validators.required],
      'cantidad': ['', Validators.required],
      'stockMinimo': ['', Validators.required],
      'stockMaximo': ['', Validators.required]
    }
  )

  formGetUpdate(fr: string) {
    return this.formCreate.get(fr) as FormControl;
  }

  formUpdate: FormGroup = this.formBuilder.group(
    {
      'codProducto': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'tipoProducto': ['', Validators.required],
      'precioVenta': ['', Validators.required],
      'precioCompra': ['', Validators.required],
      'estado': ['', Validators.required],
      'cantidad': ['', Validators.required],
      'stockMinimo': ['', Validators.required],
      'stockMaximo': ['', Validators.required]
    }
  )

  formGetCreateEmployee(fr: string) {
    return this.formCreate.get(fr) as FormControl;
  }



  listTypeProduct: Observable<any[]> | undefined



  ngOnInit(): void {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item
      if (item) {
        this.formUpdate.patchValue({
          'codProducto': this.item.codProducto,
          'descripcion': this.item.descripcion,
          'tipoProducto': this.item.tipoProducto,
          'precioVenta': this.item.precioVenta,
          'precioCompra': this.item.precioCompra,
          'cantidad': this.item.cantidad,
          'estado': this.item.estado,
          'stockMinimo': this.item.stockMinimo,
          'stockMaximo': this.item.stockMaximo
        })
      } else {
        this.formUpdate.reset()
        console.log('s')
      }
    })

    this.mydataservices.getData("producto").subscribe((respuesta: any) => {
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("tipoproducto ").subscribe((respuesta: any) => {
      this.listTypeProduct = of(respuesta)
      
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
        datosProcesados[key] = "Activo";
      } else if (datosProcesados.hasOwnProperty(key) && datosProcesados[key] === false) {
        datosProcesados[key] = "Inactivo";
      }
    }
    return datosProcesados;
  }

  onSubmit() {

  }


  saveDataCreate() {
    let data = {
      codProducto: this.formCreate.get('codProducto')?.value,
      descripcion: this.formCreate.get('descripcion')?.value,
      tipoProducto: this.formCreate.get('tipoProducto')?.value,
      precioVenta: this.formCreate.get('precioVenta')?.value,
      precioCompra: this.formCreate.get('precioCompra')?.value,
      cantidad: this.formCreate.get('cantidad')?.value,
      stockMinimo: this.formCreate.get('stockMinimo')?.value,
      stockMaximo: this.formCreate.get('stockMaximo')?.value
    }


    this.mydataservices.postData("producto", data).then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'La factura se realizo correctamente',
        })
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

  saveDataUpdate() {
    let data = {
      codProducto: this.formUpdate.get('codProducto')?.value,
      descripcion: this.formUpdate.get('descripcion')?.value,
      tipoProducto: this.formUpdate.get('tipoProducto')?.value,
      precioVenta: this.formUpdate.get('precioVenta')?.value,
      precioCompra: this.formUpdate.get('precioCompra')?.value,
      cantidad: this.formUpdate.get('cantidad')?.value,
      estado: this.formUpdate.get('estado')?.value,
      stockMinimo: this.formUpdate.get('stockMinimo')?.value,
      stockMaximo: this.formUpdate.get('stockMaximo')?.value
    }


    this.mydataservices.updateData("producto", data, this.item.codProducto).then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'La factura se realizo correctamente',
        })
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
        this.formCreate.reset()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  saveDataConfirmedUpdate() {
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
        this.saveDataUpdate()
        this.formUpdate.reset()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  onItemClick(data: any) {
    this.dataItems = data
  }


  imgItems(typeProducto: string) {
    return typeProducto === "Reparaciones" ? 'https://img.freepik.com/premium-photo/midsection-woman-cleaning-sunglasses_1048944-13733713.jpg' :
      typeProducto === "Acetatos" ? 'https://img.freepik.com/free-photo/front-view-modern-dark-sunglasses-white_140725-18263.jpg' :
        typeProducto === "Marcos" ? 'https://img.freepik.com/premium-photo/different-colorful-glasses-kinds-showcase-optical-store_143092-3385.jpg' :
          typeProducto === "Reajustes" ? 'https://img.freepik.com/premium-photo/fixing-eyeglasses-frame-optician-office_403156-725.jpg' :
            typeProducto === "Accesorios" ? 'https://img.freepik.com/free-photo/front-view-modern-sunglasses-modern-grey-desk-isolated-vision-spectacles-elegance_140725-18277.jpg' :
              typeProducto === "Monofocales" ? 'https://img.freepik.com/free-photo/pair-glasses-white-surface-with-blue-background_181624-21477.jpg' :
                typeProducto === "Bifocales" ? 'https://img.freepik.com/free-photo/pair-glasses-white-surface-with-blue-background_181624-21477.jpg' :
                  typeProducto === "Progresivos" ? 'https://img.freepik.com/free-photo/pair-glasses-white-surface-with-blue-background_181624-21477.jpg' :
                    'https://img.freepik.com/free-photo/handsome-man-optics-shop_1157-21985.jpg'; /*Servicios*/
  }

}


