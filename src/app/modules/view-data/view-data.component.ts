import { Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { DataGlobalService } from './services/data-global.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { TableColumn } from '../table/model/table-column';
// import  ResizeObserver  from 'resize-observer-polyfill';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent {

  colSize: number = 0;
  typeViewIcon: boolean = true;
  valFormularioGrip = false

  // Variables para la table
  tableColumns: TableColumn[] = []
  tableDisplayColumns: String[] = [];
  dataSource = new MatTableDataSource<any>

  //Variable para grid
  itemData$: any[] = []
  itemViewGrid!: TemplateRef<any> | null;
  formView!: TemplateRef<any> | null;


  @Input() set ItemViewGrid(itemViewGrid: TemplateRef<any>) {
    this.itemViewGrid = itemViewGrid;
  }

  // @ViewChild('customTemplate', { static: true })
  // eventClickItems!: TemplateRef<any>;
  @Input() set clickItems(item:any) {
      this.dataGlobalservice.setItemView(item);   
  }


  @Input() set FormView(formView: TemplateRef<any>) {
    this.formView = formView;
  }

  @Input() set ItemData(itemData: any) {
    console.log(itemData)

    
    this.itemData$ = itemData;
    this.dataSource.data = itemData;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns
    this.tableDisplayColumns = this.tableColumns.map(col => col.def)
  }

  private resizeObserver!: ResizeObserver;
  @ViewChild('container', { static: true })
  container!: ElementRef;


  constructor(private dataGlobalservice: DataGlobalService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.updateColSize(document.body.clientWidth);

    this.dataGlobalservice.$typeViewIcon.subscribe(type => {
      this.typeViewIcon = type;
    })

    this.dataGlobalservice.$itemView.subscribe(item=>{
      if(item){
        this.valFormularioGrip = true;
        this.updateColSize(600);
      }
    })


    // this.resizeObserver = new ResizeObserver((entries) => {
    //   for (const entry of entries) {
    //     // entry.target es el elemento que cambió de tamaño (en este caso, el componente)
    //     const newWidth = entry.contentRect.width;
    //     const newHeight = entry.contentRect.height;
    //     console.log(`Nuevo tamaño: Width = ${newWidth}, Height = ${newHeight}`);
        
    //     // Aquí puedes realizar acciones basadas en el cambio de tamaño
    //   }
    //   console.log(entries);
    // });

    // // Agrega el elemento DOM al observador
    // this.resizeObserver.observe(this.elementRef.nativeElement);

    
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateColSize(document.body.clientWidth);
    // console.log(document.body.clientWidth);
  }

  updateColSize(windowWidth: number): void {
    if (windowWidth >= 1200 && !this.valFormularioGrip) {
      this.colSize = 4; // 3 items por fila en pantallas grandes (>= 992px)
    } else if (windowWidth >= 1000 && !this.valFormularioGrip) {
      this.colSize = 3; // 3 items por fila en pantallas grandes (>= 992px)
    } else if (windowWidth >= 700 && !this.valFormularioGrip) {
      this.colSize = 2; // 2 items por fila en pantallas medianas (768px <= ancho < 992px)
    } else if( windowWidth < 700 && this.valFormularioGrip){
      this.colSize = 1; // 1 item por fila en pantallas pequeñas (< 768px)
    }
  }

  getColSize(index: number): string {
    return `col-md-${12 / this.colSize}`;
  }

  setTypeViewIcon() {
    return this.typeViewIcon ? 'fa-table-cells fa-calendar-days' : 'fa-grip';
  }

  setTypeView() {
    this.dataGlobalservice.setTypeViewIcon(!this.typeViewIcon);
  }

  setClassItems() {
    return 'content-items-' + (this.valFormularioGrip ? 'active' : 'desactive')
  }

  cancelForm() {
    this.dataGlobalservice.setItemView(null);
    this.valFormularioGrip = false;
    this.updateColSize(document.body.clientWidth);
  }

}
