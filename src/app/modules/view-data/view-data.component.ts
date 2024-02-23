import { Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { DataGlobalService } from './services/data-global.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { TableColumn } from '../table/model/table-column';
import { DialogService } from '../dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { SearchTableService } from '../table/service/search-table.service';
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
  valFomularioTable = false

  // Variables para la table
  tableColumns: TableColumn[] = []
  tableDisplayColumns: String[] = [];
  dataSource = new MatTableDataSource<any>;
  btnUpdate = true;
  btnInfo = true;
  btnDelete = false;

  //Variable para grid
  item: any = null;
  itemData$: any[] = []
  itemViewGrid: TemplateRef<any> | null = null;
  formView: TemplateRef<any> | null = null;
  formCreateView: TemplateRef<any> | null = null;
  formInfoView: TemplateRef<any> | null = null;
  private matDialogRef!: MatDialogRef<DialogComponent>;

  public page!: number




  @Input() set clickItems(item: any) {
    this.dataGlobalservice.setItemView(item);
  }

  // templateRef
  @Input() set ItemViewGrid(itemViewGrid: TemplateRef<any>) {
    this.itemViewGrid = itemViewGrid;
  }

  @Input() set FormView(formView: TemplateRef<any>) {
    this.formView = formView;
  }

  @Input() set FormCreateView(formView: TemplateRef<any>) {
    this.formCreateView = formView;
  }

  @Input() set FormInfoView(formView: TemplateRef<any>) {
    this.formInfoView = formView;
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


  filteredItemData: any[] = []

  @Input() set ItemData(itemData: any) {
    this.itemData$ = itemData;
    this.filteredItemData = this.itemData$;
    this.dataSource.data = itemData;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns
    this.tableDisplayColumns = this.tableColumns.map(col => col.def)
  }

  private resizeObserver!: ResizeObserver;
  @ViewChild('container', { static: true })
  container!: ElementRef;


  constructor(private dataGlobalservice: DataGlobalService,
    private elementRef: ElementRef,
    private dialogService: DialogService,
    private searchService: SearchTableService
  ) { }

  ngOnInit() {
    this.updateColSize(document.body.clientWidth);

    this.dataGlobalservice.$typeViewIcon.subscribe(type => {
      this.typeViewIcon = type;
    })

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item;
      if (item) {
        this.valFormularioGrip = true;
        // this.updateColSize(600);

        // if (this.typeViewIcon && this.valFormularioGrip) {
        //   const opcional = document.querySelector('#formulario-table');
        //   opcional?.scrollIntoView();
        // }
      } else {
        this.valFomularioTable = false;
        this.valFormularioGrip = false;
        // this.updateColSize(document.body.clientWidth);
      }
    })


    // this.searchService.cleanTextFilter()

    this.searchService.text$.subscribe(search => {
      if (search && search.target && search.target instanceof HTMLInputElement) {

        const lowerCaseFilterValue = search.target.value.toLowerCase();

        console.log(lowerCaseFilterValue)
        this.filteredItemData = this.itemData$.filter(item => {
          const objectValues = Object.values(item);
          return objectValues.some((value:any) => value.toString().toLowerCase().includes(lowerCaseFilterValue));
        });
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

  getSearchFilter(text: any) {
    this.searchService.setTextFilter(text)
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

  openDialogWithTemplate(template: TemplateRef<any> | null, templateV: TemplateRef<any> | null = null) {
    if (template && templateV) {
      console.log(this.formCreateView)
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

  valFormTablet() {
    this.valFomularioTable = this.item ? true : false;
  }

}
