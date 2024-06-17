import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  data$: Observable<any>[] = []
  dataItems: any = null;
  item: any = null

  tableColumnsInventory: TableColumn[] = [
    { label: 'Codigo', def: 'codigoProveedor', dataKey: 'codigoProveedor' },
    { label: 'Contacto', def: 'contacto', dataKey: 'contacto' },
    { label: 'Direccion', def: 'direccion', dataKey: 'direccion' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Nombre de la Empresa', def: 'nombre_Empresa', dataKey: 'nombre_Empresa' },
    { label: 'Correos', def: 'correos', dataKey: 'correos' },
    { label: 'Telefonos', def: 'telefonos', dataKey: 'telefonos' }
  ]

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

    this.mydataservices.getData("proveedor ").subscribe((respuesta: any) => {
      this.data$ = respuesta
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("tipoproducto ").subscribe((respuesta: any) => {
      this.listTypeProduct = of(respuesta)
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })
  }



}
