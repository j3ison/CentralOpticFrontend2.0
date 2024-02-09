import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY, catchError, finalize } from 'rxjs';
import { ApiService } from 'src/app/auth/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginCredentials } from 'src/app/auth/model';
import { DialogComponent } from 'src/app/modules/dialog/dialog.component';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  email!: string;
  password!: string;
  private matDialogRef!: MatDialogRef<DialogComponent>;
  @ViewChild('carderror')
  cardError!: TemplateRef<any>;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    let objeto = history.state.objeto;
    if (objeto) {
      // this.auth.logout()
    }
  }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  processingRequest = false;

  onSubmit() {
    this.auth.login(this.loginForm.value as LoginCredentials).
      then(
        (success) => {
          if (success) { } else {
            this.openDialogWithTemplate(this.cardError);
          }
        }
      )
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });
    this.matDialogRef.afterClosed().subscribe((res) => { });
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }


}
