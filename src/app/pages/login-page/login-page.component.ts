import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  name: string
  password: string
  isLogin: boolean = false
  buttonTxt: string = 'Login'
  headerTxt: string = 'Signup'
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  async onSignup() {
    try {
      console.log('this.name', this.name);
      await this.userService.signup(this.name, this.password);
      await this.userService.login(this.name, this.password);
      this.userService.saveIsLoggedIn(true)
      this.router.navigateByUrl('');
    } catch (err) {
      console.log(err);
      this.messageService.save(`The name you picked allread exists.`);
      return Promise.resolve(err)
    }
  }

  async onLogin(ev) {
    console.log('ev', ev); 
    try {
      await this.userService.login(this.name, this.password);
      this.userService.saveIsLoggedIn(true)
      this.router.navigateByUrl('');
    } catch (err) {
      if (err.response?.status === 401) {
        this.messageService.save('Invalid username or password.')
      } else {
        this.messageService.save('Problem connecting to server.')
      }
      this.password = ''
      this.name = ''
      return
    }
  }
  showLogin() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.buttonTxt = 'Signup';
      this.headerTxt = 'Login';
    }
    else {
      this.buttonTxt = 'Login';
      this.headerTxt = 'Signup';
    }
  }

}
