import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Output() onSelect = new EventEmitter<void>()
  isNavOn: boolean = false
  isLoggedIn: boolean = false
  subscription: Subscription
  constructor(private router: Router, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    const loggedInUser = await this.userService.getLoggedInUser()
    if (loggedInUser) {
      this.userService.saveIsLoggedIn(true)
    }
    this.subscription = this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn[0]
    })
  }
  toggleMenu() {
    this.isNavOn = !this.isNavOn;
    console.log('inside toggle');

  }
  onClickLink(path: string) {
    if (this.isNavOn) this.isNavOn = !this.isNavOn;
    this.router.navigateByUrl(`${path}`);
  }

  onClickHeader() {
    this.router.navigateByUrl('');
  }
  onLogout() {
    if (this.isNavOn) this.isNavOn = !this.isNavOn;
    this.onSelect.emit()
    this.userService.saveIsLoggedIn(false)
  }
}
