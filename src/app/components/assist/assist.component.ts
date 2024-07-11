import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginUser } from 'src/app/auth/model/user.interface';

@Component({
  selector: 'app-assist',
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.css']
})
export class AssistComponent {
  userFromLocal = this.cookieService.get('userData');
  user: LoginUser = JSON.parse(this.userFromLocal) as LoginUser

  constructor(private cookieService: CookieService){
  }

}
