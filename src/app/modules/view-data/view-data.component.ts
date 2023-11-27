import { Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { DataGlobalService } from './services/data-global.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { TableColumn } from '../table/model/table-column';
import { DialogService } from '../dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
  dataSource = new MatTableDataSource<any>;
  btnUpdate = true;
  btnInfo = true;
  btnDelete = false;

  //Variable para grid
  itemData$: any[] = []
  itemViewGrid!: TemplateRef<any> | null;
  formView!: TemplateRef<any> | null;
  formCreateView!: TemplateRef<any> | null;
  private matDialogRef!: MatDialogRef<DialogComponent>;



  @Input() set ItemViewGrid(itemViewGrid: TemplateRef<any>) {
    this.itemViewGrid = itemViewGrid;
  }

  @Input() set clickItems(item: any) {
    this.dataGlobalservice.setItemView(item);
  }


  @Input() set FormView(formView: TemplateRef<any>) {
    this.formView = formView;
  }

  @Input() set FormCreateView(formView: TemplateRef<any>) {
    this.formCreateView = formView;
  }

  @Input() set tabletBtnUpdate(btnUpdate: boolean) {
    this.btnUpdate = btnUpdate;
  }

  @Input() set tabletBtnDelete(btnDelete: boolean) {
    this.btnDelete = btnDelete;
  }

  @Input() set tabletBtnInfo(btnInfo: boolean) {
    this.btnInfo = btnInfo;
  }

  

  @Input() set ItemData(itemData: any) {
    // console.log(itemData)


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


  constructor(private dataGlobalservice: DataGlobalService, private elementRef: ElementRef, private dialogService: DialogService) { }

  ngOnInit() {
    this.updateColSize(document.body.clientWidth);

    this.dataGlobalservice.$typeViewIcon.subscribe(type => {
      this.typeViewIcon = type;
    })

    this.dataGlobalservice.$itemView.subscribe(item => {
      if (item) {
        this.valFormularioGrip = true;
        this.updateColSize(600);

        if (this.typeViewIcon && this.valFormularioGrip) {
          const opcional = document.querySelector('#formulario-table');
          opcional?.scrollIntoView();
        }
      } else {
        this.valFormularioGrip = false;
        this.updateColSize(document.body.clientWidth);
      }
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateColSize(document.body.clientWidth);
    // console.log(document.body.clientWidth);
  }

  updateColSize(windowWidth: number): void {
    if (windowWidth >= 1200 && !this.valFormularioGrip) {
      this.colSize = 4; // 4 items por fila en pantallas grandes (>= 1200px)
    } else if (windowWidth >= 1000 && !this.valFormularioGrip) {
      this.colSize = 3; // 3 items por fila en pantallas grandes (>= 1000px)
    } else if (windowWidth >= 700 && !this.valFormularioGrip) {
      this.colSize = 2; // 2 items por fila en pantallas medianas (>= 768px)
    } else if (windowWidth < 700 && this.valFormularioGrip) {
      this.colSize = 1; // 1 item por fila en pantallas pequeñas (< 700px)
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
  }

  openDialogWithTemplate(template: TemplateRef<any> | null) {
    if (template){
      this.matDialogRef = this.dialogService.openDialogWithTemplate({template});
  
      this.matDialogRef.afterClosed().subscribe((res) => {
      });
    }
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

}
