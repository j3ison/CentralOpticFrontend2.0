import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import { DataGlobalService } from 'src/app/modules/view-data/services/data-global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  data$: Observable<any>[] = []

  tableColumnsCliente: TableColumn[] = [
    { label: 'ID de Empresa', def: 'id_Empresa', dataKey: 'id_Empresa' },
    { label: 'Numero de Ruc', def: 'numero_Ruc', dataKey: 'numero_Ruc' },
    { label: 'Nombre de la Empresa', def: 'nombre', dataKey: 'nombre' },
   
  ];

  formData: FormGroup = this.formBuilder.group(
    {
      'id_Empresa': ['', Validators.nullValidator],
      'numero_Ruc': ['', Validators.required],
      'nombre': ['', Validators.required],
    }
  )

  itemClick: any = null;


  constructor(private mydataservices: MyDataServices,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private authService: AuthService,
    private dataGlobalservice: DataGlobalService,
  ) { }

  ngOnInit(){

    this.dataGlobalservice.$itemView.subscribe(item => {

      this.itemClick = item

      if (item) {

        this.formData.patchValue ({
          id_Empresa: item.id_Empresa,
          numero_Ruc: item.numero_Ruc,
          nombre: item.nombre,
        })
      }else{
        this.formData.reset()
      }

    })
    
    this.mydataservices.getData("empresa").subscribe((respuesta: any) => {
      this.data$ =  respuesta.reverse()
    }, (error) => {
      console.log(error)
    })

  }

  saveDataConfirmed() {

    const type = !this.itemClick?'Guardar':'Actualizar'

    Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro que desea '+type+' la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: type,
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDataCreate()
        this.mydataservices.getData("empresa").subscribe((respuesta: any) => {
          this.data$ =  respuesta.reverse()
        }, (error) => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Los datos siguen a salvo:)',
          'error'
        )
      }
    });
  }

  saveDataCreate(){
    if(!this.itemClick){
      this.mydataservices.postData('empresa', {
        numero_Ruc:this.formData.get('numero_Ruc')?.value,
        nombre:this.formData.get('nombre')?.value
      }).then((success) => {
        if(success){

          this.formData.reset()

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: '¡La información ha sido guardada exitosamente!',
          })
        }
      })
    }else{
      this.mydataservices.updateData('empresa', {
        numero_Ruc:this.formData.get('numero_Ruc')?.value,
        nombre:this.formData.get('nombre')?.value
      }, this.itemClick.id_Empresa).then((success) => {
        if(success){

          this.formData.reset()

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: '¡La información ha sido Actualizada exitosamente!',
          })
        }
      })
    }
  }



}
