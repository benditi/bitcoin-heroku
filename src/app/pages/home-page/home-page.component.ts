import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/move.model';
import { UserService } from 'src/app/services/user.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user!: Contact;
  bitcoinRate:any;
  movesList:Array<Move>
  title:string='Your last Moves:'
  coinsWorth:number

  constructor( private bitcoinService: BitcoinService, private userService:UserService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getLoggedInUser();
    console.log('home user', typeof(this.user));
    this.bitcoinRate = (await this.bitcoinService.getCoinRate()).todaysVal
    this.movesList = await this.userService.getMovesList(null)
    console.log('Home page move-list', this.movesList);
    this.coinsWorth = this.bitcoinRate * this.user.coins;
        
  }
}
