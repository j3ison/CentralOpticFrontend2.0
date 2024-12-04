import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

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
    { label: 'Codigo Producto', def: 'codigoProducto', dataKey: 'codigoProducto' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Nombre de la Empresa', def: 'nombreEmpresa', dataKey: 'nombreEmpresa' },
    { label: 'Costo', def: 'costo', dataKey: 'costo' },
    { label: 'Estado', def: 'estado', dataKey: 'estado' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
    { label: 'Fecha Adquisición', def: 'fechaAdquisicion', dataKey: 'fechaAdquisicion' }
  ]
  fecha = new Date();

  constructor(private mydataservices: MyDataServices, private formBuilder: FormBuilder, private dataGlobalservice: DataGlobalService) { }

  formCreate: FormGroup = this.formBuilder.group(
    {
      'descripcion': ['', Validators.required],
      'nombreEmpresa': ['', Validators.required],
      'fechaAdquisicion': [new Date(), Validators.required],
      'costo': ['', Validators.required],
      'cantidad': ['', Validators.required]
    }
  )

  formGetUpdate(fr: string) {
    return this.formCreate.get(fr) as FormControl;
  }

  formUpdate: FormGroup = this.formBuilder.group(
    {
      'descripcion': ['', Validators.required],
      'nombreEmpresa': ['', Validators.required],
      'fechaAdquisicion': ['', Validators.required],
      'costo': ['', Validators.required],
      'cantidad': ['', Validators.required],
      'estado': ['Valido', Validators.required]
    }
  )

  formGetCreate(fr: string) {
    return this.formCreate.get(fr) as FormControl;
  }



  listTypeProduct: Observable<any[]> | undefined
  filteredOptions: Observable<any[]> | undefined;

  listTypeProveedor: Observable<any[]> | undefined
  filteredProveedor: Observable<any[]> | undefined;

  listStatus: Observable<string[]> = of(['Valido', 'Invalido'])
  filteredStatus: Observable<any[]> | undefined;

  ngOnInit(): void {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item
      if (item) {
        this.formUpdate.patchValue({
          'descripcion': this.item.descripcion,
          'nombreEmpresa': this.item.nombreEmpresa,
          'fechaAdquisicion': this.item.fechaAdquisicion,
          'costo': this.item.costo,
          'cantidad': this.item.cantidad,
          'estado': this.item.estado ? 'Valido' : 'Invalido'
        })
      } else {
        this.formUpdate.reset()
        console.log('s')
      }
    })

    this.mydataservices.getData("registroproducto").subscribe((respuesta: any) => {
      this.data$ = respuesta.map((obj: any) => this.procesarDatosNulos(obj));
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("producto  ").subscribe((respuesta: any) => {
      this.listTypeProduct = of(respuesta)
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })

    this.mydataservices.getData("proveedor").subscribe((respuesta: any) => {
      this.listTypeProveedor = of(respuesta)
      console.log(respuesta)
    }, (error) => {
      console.log(error)
    })

    this.filteredOptions = this.formCreate.get('descripcion')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptions = this.formUpdate.get('descripcion')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredProveedor = this.formCreate.get('nombreEmpresa')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProveedor(value))
    );

    this.filteredProveedor = this.formUpdate.get('nombreEmpresa')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProveedor(value))
    );

    this.filteredStatus = this.formUpdate.get('estado')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
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

  private _filter(value: string): { descripcion: string }[] {
    const filterValue = value.toLowerCase();
    let options: any[] = [];
    this.listTypeProduct?.subscribe(data => {
      options = data.filter(option => option.descripcion.toLowerCase().includes(filterValue));
    });
    return options;
  }

  private _filterProveedor(value: string): { descripcion: string }[] {
    const filterValue = value.toLowerCase();
    let options: any[] = [];
    this.listTypeProveedor?.subscribe(data => {
      options = data.filter(option => option.nombre_Empresa.toLowerCase().includes(filterValue));
    });
    return options;
  }

  private _filterStatus(value: string): { descripcion: string }[] {
    const filterValue = value.toLowerCase();
    let options: any[] = [];
    this.listStatus?.subscribe(data => {
      options = data.filter(option => option.toLowerCase().includes(filterValue));
    });
    return options;
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

  // 'descripcion': this.item.descripcion,
  //         'nombreEmpresa': this.item.nombreEmpresa,
  //         'fechaAdquisicion': this.item.fechaAdquisicion,
  //         'costo': this.item.costo,
  //         'cantidad': this.item.cantidad,
  //         'estado': this.item.estado? 'Valido' : 'Invalido'

  saveDataCreate() {
    let fecha1 = new Date();
    fecha1.setHours(0, 0, 0, 0)
    let data = {
      descripcion: this.formCreate.get('descripcion')?.value,
      nombreEmpresa: this.formCreate.get('nombreEmpresa')?.value,
      fechaAdquisicion: fecha1,
      costo: this.formCreate.get('costo')?.value,
      cantidad: this.formCreate.get('cantidad')?.value,
      // estado: this.formCreate.get('estado')?.value
    }
    this.mydataservices.postData("registroproducto", data).then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'El registro del producto guardado con exito!',
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

  itemClick: any = null

  onItemClickActive(data: any) {

    if (this.itemClick !== data) {
      this.itemClick = data
      this.dataGlobalservice.setItemView(data);
    } else {
      this.itemClick = null
      this.dataGlobalservice.setItemView(null);
    }
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


  saveDataConfirmedUpdate() {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea actualizar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
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


  saveDataUpdate() {
    let fecha1 = new Date(this.formUpdate.get('fechaAdquisicion')?.value);
    fecha1.setHours(0, 0, 0, 0)
    let data = {
      descripcion: this.formUpdate.get('descripcion')?.value,
      nombreEmpresa: this.formUpdate.get('nombreEmpresa')?.value,
      fechaAdquisicion: fecha1,
      costo: this.formUpdate.get('costo')?.value,
      cantidad: this.formUpdate.get('cantidad')?.value,
      estado: this.formUpdate.get('estado')?.value == 'Valido' ? true : false
    }

    console.log(data)

    this.mydataservices.updateData("registroproducto", data,'').then((success) => {
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'El registro del producto guardado con exito!',
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

}
