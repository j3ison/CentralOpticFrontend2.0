import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  tableColumnsProveedor: TableColumn[] = [
    { label: 'Codigo', def: 'codProducto', dataKey: 'codProducto' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Tipo', def: 'tipoProducto', dataKey: 'tipoProducto' },
    { label: 'Venta', def: 'precioVenta', dataKey: 'precioVenta' },
    { label: 'Compra', def: 'precioCompra', dataKey: 'precioCompra' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
    { label: 'Stock Minimo', def: 'stockMinimo', dataKey: 'stockMinimo' },
    { label: 'Stock Maximo', def: 'stockMaximo', dataKey: 'stockMaximo' }
  ]

  data$: Observable<any>[] = []
  dataItems: any = null;

  @Output() eventClickItems = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private mydataservices: MyDataServices) { }



  ngOnInit(): void {
    this.form = this.fb.group({
      cantidad: [0],
      codProducto: [''],
      descripcion: [''],
      estado: [true],
      precioCompra: [0],
      precioVenta: [370],
      stockMaximo: [0],
      stockMinimo: [0],
      tipoProducto: ['Reparaciones']
    });

    this.mydataservices.getData("producto").subscribe((respuesta: any) => {
      this.data$ = respuesta
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })
  }

  onSubmit() {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: 'Esta opcion aun esta en proceso de desarrollo'
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