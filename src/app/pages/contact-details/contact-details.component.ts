import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/move.model';
import { UserService } from 'src/app/services/user.service';
import { ContactService } from 'src/app/services/contact.service';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription
  currContact:Contact
  movesList:Array<Move>
  title:string='Your Moves:'
  isFriend:boolean
  
  constructor(
    private route: ActivatedRoute, 
    private contactService:ContactService, 
    private router: Router, 
    private userService:UserService,
    private messageService: MessageService
    ) { }

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe(data=>{
      console.log('data', data);
      this.currContact = data.contact
    })
    this.movesList = await this.userService.getMovesList(this.currContact)
    this.isFriend = this.contactService.checkIfFriend(this.currContact._id)    
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }
  goToEdit(){
    this.router.navigate(['/edit', this.currContact._id])
  }
  async transfer(transferSum){
    const loggedInUser = await this.userService.getLoggedInUser()
    if (transferSum > loggedInUser.coins) {
      this.messageService.save('You dont have enough bitcoins to sell!');
      return;
    }
    await this.userService.addMove(transferSum, this.currContact);
    this.messageService.save(`Sold ${transferSum} bitcoins successfully to ${this.currContact.name}.`)
    this.movesList = await this.userService.getMovesList(this.currContact);
  }

}
