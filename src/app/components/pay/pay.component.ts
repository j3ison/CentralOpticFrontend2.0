import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';



// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: './pay.component.html',
//   standalone: true,
//   imports: [],
// })
// export class DialogOverviewExample {
//   animal: string | undefined;
//   name: string | undefined;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogOverviewExample, {
//       data: {name: this.name, animal: this.animal},
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }
// }






@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {

}
