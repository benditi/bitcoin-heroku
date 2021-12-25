import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeFriend } from 'src/app/models/changeFriend.model';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[]
  @Input() isFriend: boolean
  @Output() remove = new EventEmitter<string>()
  @Output() addFriend = new EventEmitter<ChangeFriend>()
  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(idx: number, item: Contact) {
    return item._id
  }

}
