import { Component, HostListener, Input, TemplateRef } from '@angular/core';
import { DataGlobalService } from './services/data-global.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { TableColumn } from '../table/model/table-column';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent {

  colSize: number = 0;
  typeViewIcon: boolean = true;
  valFormularioGrip=false
  
  // Variables para la table
  tableColumns: TableColumn[] = []
  tableDisplayColumns: String[] = [];
  dataSource = new MatTableDataSource<any>
  
  //Variable para grid
  itemData$:any[]=[]
  itemViewGrid!: TemplateRef<any> | null;
  formView!: TemplateRef<any> | null;

  @Input() set ItemViewGrid(itemViewGrid: TemplateRef<any>){
    this.itemViewGrid=itemViewGrid;
  }

  @Input() set FormView(formView: TemplateRef<any>){
    this.formView=formView;
  }

  @Input() set ItemData(itemData: any){
    this.itemData$=itemData;
    // itemData.pipe(
    //   tap((data: any[]) => {
    //     this.dataSource.data = data.reverse();
    //     this.itemData$ = data
    //   })
    // ).subscribe();
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns
    this.tableDisplayColumns = this.tableColumns.map(col => col.def)
  }


  constructor(private dataGlobalservice:DataGlobalService){}

  ngOnInit(){
    this.updateColSize(document.body.clientWidth);

    this.dataGlobalservice.$typeViewIcon.subscribe(type =>{
      this.typeViewIcon = type;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateColSize(document.body.clientWidth);
    console.log(document.body.clientWidth);
  }

  updateColSize(windowWidth: number): void {
    if (windowWidth >= 1200) {
      this.colSize = 4; // 3 items por fila en pantallas grandes (>= 992px)
    } else if (windowWidth >= 1000) {
      this.colSize = 3; // 3 items por fila en pantallas grandes (>= 992px)
    } else if (windowWidth >= 700) {
      this.colSize = 2; // 2 items por fila en pantallas medianas (768px <= ancho < 992px)
    } else {
      this.colSize = 1; // 1 item por fila en pantallas pequeñas (< 768px)
    }
  }

  getColSize(index: number): string {
    return `col-md-${12 / this.colSize}`;
  }

  setTypeViewIcon(){
    return this.typeViewIcon?'fa-table-cells fa-calendar-days':'fa-grip';
  }

  setTypeView(){
    this.dataGlobalservice.setTypeViewIcon(!this.typeViewIcon);
  }

  setClassItems(){
    return 'content-items-'+ (this.valFormularioGrip?'active':'desactive')
  }

  clickItemGrip(){
    this.valFormularioGrip = true;
    this.updateColSize(699);
  }

  cancelForm(){
    this.updateColSize(document.body.clientWidth);
    this.valFormularioGrip = false;
  }

}
