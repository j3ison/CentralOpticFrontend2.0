import { Component } from '@angular/core';
import { TableColumn } from 'src/app/modules/table/model/table-column';
import Swal from 'sweetalert2';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {


  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA;

  myData$ = [
    {
      "idRol": 1,
      "rol": "Super Administrador",
      "descripcion": "Acceso completo al sistema junto con la administración de los usuarios"
    },
    {
      "idRol": 2,
      "rol": "Administrador",
      "descripcion": "Acceso completo al sistema"
    },
    {
      "idRol": 3,
      "rol": "Optometrista",
      "descripcion": "Acceso a los modulos referentes al cuidado de la vista"
    },
    {
      "idRol": 4,
      "rol": "Venta",
      "descripcion": "Acceso a los modulos referentes a las ventas del producto"
    }
  ]

  tableColumns: TableColumn[] = [
    { label: 'ID Rol', def: 'idRol', dataKey: 'idRol' },
    { label: 'Rol', def: 'rol', dataKey: 'rol' },
    { label: 'Descripcion', def: 'descripcion', dataKey: 'descripcion' }
  ]


  click() {

    const Table = `
      <app-table [data]="myData$" [columns]="tableColumns"></app-table>
    `
    const table = `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 demo-table">
    <!-- Position Column -->
    <ng-container matColumnDef="demo-position">
      <th mat-header-cell *matHeaderCellDef> No. </th>
      <td mat-cell *matCellDef="let element"> {{element.position}} </td>
    </ng-container>
  
    <!-- Name Column -->
    <ng-container matColumnDef="demo-name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    </ng-container>
  
    <!-- Weight Column -->
    <ng-container matColumnDef="demo-weight">
      <th mat-header-cell *matHeaderCellDef> Weight </th>
      <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
    </ng-container>
  
    <!-- Symbol Column -->
    <ng-container matColumnDef="demo-symbol">
      <th mat-header-cell *matHeaderCellDef> Symbol </th>
      <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
    </ng-container>
  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
    `;

    const selectOptions = {
      'option1': 'Opción 1',
      'option2': 'Opción 2',
      'option3': 'Opción 3'
    };

    const selectModalHTML = `
    <select id="custom-select" class="form-control">
      <option value="option1">Opción 1 <i class="fa-solid fa-address-card"></i></option>
      <option value="option2">Opción 2 <i class="fa-solid fa-address-card"></i></option>
      <option value="option3">Opción 3 <i class="fa-solid fa-address-card"></i></option>
    </select>
  `;

    Swal.fire({
      title: 'Selecciona una opción',
      html: table,
      showCancelButton: true,
      confirmButtonText: 'Cerrar'
    }).then((result) => {

    });
  }

}
