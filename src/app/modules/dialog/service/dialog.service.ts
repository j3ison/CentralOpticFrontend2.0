import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog.component';
import { DialogTamplateData } from 'src/app/modules/dialog/models/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialogWithTemplate(template: TemplateRef<any>) {
    return this.matDialog.open(DialogComponent, { data : { template }, width:'calc(45%)' });
  }
}
