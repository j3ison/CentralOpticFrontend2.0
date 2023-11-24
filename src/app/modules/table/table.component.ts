import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { TableColumn } from './model/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DataGlobalService } from '../view-data/services/data-global.service';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSource = new MatTableDataSource<any>
  tableDisplayColumns: String[] = [];
  tableColumns: TableColumn[] = []
  Showdelete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataUpdate: any = {}
  btnClickItemRow: boolean = true;

  selection = new SelectionModel<any>(true, []);

  onSelect() {
    // this.select.emit(this.selection.selected);
  }


  //Comentario de Jurgen: Pongan la columna de Idcliente tambien

  @Input() set data(data: any) {

    this.dataSource.data = data.reverse();
    
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns

    this.tableDisplayColumns = this.tableColumns.map(col => col.def)

  }

  item = null
  showInfo = false;
  showDelete = false;

  @Input() set buttonShowInfo(ShowInfo: boolean) {
    if(ShowInfo){
      this.showInfo = ShowInfo
    }
  }

  @Input() set buttonShowDelete(ShowDelete: boolean) {
    if(ShowDelete){
      this.showDelete = ShowDelete
    }
  }

  @Output() selectItemsCell: EventEmitter<any>;
  @Output() selectItemsCellDelete: EventEmitter<any>;
  @Output() selectItemsCellInfo: EventEmitter<any>;

  constructor( private cdr: ChangeDetectorRef, private dataGlobalservice: DataGlobalService) {

    this.selectItemsCell = new EventEmitter();
    this.selectItemsCellDelete = new EventEmitter();
    this.selectItemsCellInfo = new EventEmitter();
  }

  ngOnInit(): void {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item;
      if(item){
        this.btnClickItemRow = false;
      }else{
        this.btnClickItemRow = true;
      }
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  getTypeData(data: any): boolean {
    if (typeof data === "object") {
      return true;
    }
    return false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getActiveClass(active: any): string {
    if(!this.item) return ''
    return active == this.item ? 'active' : '';
  }

  selectItem(item: any) {
    this.selectItemsCell.emit(undefined);
    if (item == this.dataUpdate) {
      this.btnClickItemRow = true;
      this.dataUpdate = undefined;
      this.dataGlobalservice.setItemView(null);
      this.selectItemsCell.emit(this.dataUpdate);
      return
    }
    this.btnClickItemRow = false;
    this.dataUpdate = item;
    this.dataGlobalservice.setItemView(item);
  }

  btnClickUpdate() {
    this.selectItemsCell.emit(this.dataUpdate);
  }

  btnClickDelete() {
    this.selectItemsCellDelete.emit(this.dataUpdate);
  }

  btnClickInfo() {
    this.selectItemsCellInfo.emit(this.dataUpdate);
  }

  btnClickExport() {
    // console.log(this.dataSource.data);
    // console.log(this.tableColumns);
    // this.exportToExcel();
  }

}
