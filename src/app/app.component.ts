import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  msgs: string[] | string
  msgs$: Observable<any[]>
  title = 'mister-BITcoin'
  subscription: Subscription
  isLogoutMsg: boolean = false;

  constructor(private messageService: MessageService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.subscription = this.messageService.msgs$.subscribe(msgs => {
      console.log('ngOnInit -> msgs', msgs);
      if (msgs.length === 0) return
      this.msgs = msgs
      setTimeout(() => {
        this.msgs = '';
      }, 2000)
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  onShowLogout() {
    console.log('Inside app logout');
    this.isLogoutMsg = true;
  }
  onAnsYes() {
    this.isLogoutMsg = false;
    this.userService.logout()
    this.router.navigateByUrl('login')
  }
  onAnsNo() {
    this.isLogoutMsg = false;
  }
}
