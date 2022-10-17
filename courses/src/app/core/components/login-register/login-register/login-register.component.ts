import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  providers:[ConfigService]
})
export class LoginRegisterComponent implements OnInit {

  error!: string;
  form!: FormGroup;
  httpService! : ConfigService;
  user!: User;

  constructor(configService : ConfigService) {
    this.httpService = configService;
   }

  ngOnInit(): void {
   this.createForm();
  }

  createForm(){
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
  }

  submit(){
    console.log("Calling login service");
    this.httpService.login('https://httpbin.org/get').subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user.url);
    })
  }

}
